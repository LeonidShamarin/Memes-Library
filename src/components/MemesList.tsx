'use client';

import { useMemesStorage } from '../hooks/useMemesStorage';
import MemeCard from './MemeCard';

export default function MemesList() {
  const { memes, isLoading } = useMemesStorage();

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Завантаження...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Список мемів</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </div>
  );
}

