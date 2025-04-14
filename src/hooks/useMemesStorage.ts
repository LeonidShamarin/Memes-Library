import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Meme } from '../types';
import { initialMemes } from '../data/memes';

const MEMES_STORAGE_KEY = 'memes-data';

export const useMemesStorage = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredMemes, setFilteredMemes] = useState<Meme[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<string>('id-asc');

  useEffect(() => {
    const storedMemes = Cookies.get(MEMES_STORAGE_KEY);
    
    if (storedMemes) {
      try {
        setMemes(JSON.parse(storedMemes));
      } catch (error) {
        console.error('Failed to parse stored memes:', error);
        setMemes(initialMemes);
      }
    } else {
      setMemes(initialMemes);
    }
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let result = [...memes];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(meme => 
        meme.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    result = sortMemes(result, sortOption);
    
    setFilteredMemes(result);
  }, [memes, searchTerm, sortOption]);

  const sortMemes = (memesToSort: Meme[], option: string): Meme[] => {
    const [field, direction] = option.split('-');
    
    return [...memesToSort].sort((a, b) => {
      let comparison = 0;
      
      if (field === 'id') {
        comparison = a.id - b.id;
      } else if (field === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (field === 'likes') {
        comparison = a.likes - b.likes;
      }
      
      return direction === 'asc' ? comparison : -comparison;
    });
  };

  const updateMeme = (updatedMeme: Meme) => {
    let updatedMemes: Meme[];
    
    // Check if we're updating an existing meme or adding a new one
    const existingMemeIndex = memes.findIndex(meme => meme.id === updatedMeme.id);
    
    if (existingMemeIndex >= 0) {
      // Update existing meme
      updatedMemes = memes.map(meme => 
        meme.id === updatedMeme.id ? updatedMeme : meme
      );
    } else {
      // Add new meme
      updatedMemes = [...memes, updatedMeme];
    }
    
    setMemes(updatedMemes);
    Cookies.set(MEMES_STORAGE_KEY, JSON.stringify(updatedMemes), { expires: 7 });
  };

  const deleteMeme = (id: number) => {
    const updatedMemes = memes.filter(meme => meme.id !== id);
    setMemes(updatedMemes);
    Cookies.set(MEMES_STORAGE_KEY, JSON.stringify(updatedMemes), { expires: 7 });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSort = (option: string) => {
    setSortOption(option);
  };

  return { 
    memes: filteredMemes, 
    allMemes: memes,
    updateMeme, 
    deleteMeme,
    handleSearch,
    handleSort,
    isLoading 
  };
};