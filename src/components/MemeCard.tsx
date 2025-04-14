'use client';

import { Card, Image } from '@heroui/react';
import { Meme } from '../types';

interface MemeCardProps {
  meme: Meme;
}

export default function MemeCard({ meme }: MemeCardProps) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9">
        <Image 
          src={meme.imageUrl}
          alt={meme.name}
          className="w-full h-64 object-cover"
          onError={(e) => {
            // Fallback на випадок якщо зображення не завантажилось
            e.currentTarget.src = "https://placehold.co/600x400?text=Мем+зображення";
          }}
        />
      </div>
      <Card.Body className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{meme.name}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1 text-red-500" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
              clipRule="evenodd" 
            />
          </svg>
          {meme.likes} лайків
        </div>
        <a 
          href={meme.imageUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
        >
          Переглянути зображення
        </a>
      </Card.Body>
    </Card>
  );
}

