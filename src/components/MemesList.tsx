'use client';

import { useMemesStorage } from '../hooks/useMemesStorage';
import MemeCard from './MemeCard';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import AddMemeButton from './AddMemeButton';

export default function MemesList() {
  const { memes, handleSearch, handleSort, isLoading } = useMemesStorage();

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Завантаження...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Список мемів</h1>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchBar onSearch={handleSearch} />
          <SortDropdown onSort={handleSort} />
        </div>
        <AddMemeButton />
      </div>
      
      {memes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {memes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white shadow rounded-lg">
          <p className="text-gray-500">Не знайдено мемів, що відповідають критеріям пошуку</p>
        </div>
      )}
    </div>
  );
}
