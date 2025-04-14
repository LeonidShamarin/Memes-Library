import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Meme } from '../types';
import { initialMemes } from '../data/memes';

const MEMES_STORAGE_KEY = 'memes-data';

export const useMemesStorage = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const updateMeme = (updatedMeme: Meme) => {
    const updatedMemes = memes.map(meme => 
      meme.id === updatedMeme.id ? updatedMeme : meme
    );
    
    setMemes(updatedMemes);
    Cookies.set(MEMES_STORAGE_KEY, JSON.stringify(updatedMemes), { expires: 7 });
  };

  return { memes, updateMeme, isLoading };
};
