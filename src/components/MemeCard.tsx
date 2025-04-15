"use client";

import { Card, Badge } from "@heroui/react";
import { Meme } from "../types";
import { useState } from "react";

interface MemeCardProps {
  meme: Meme;
}

export default function MemeCard({ meme }: MemeCardProps) {
  const [imgSrc, setImgSrc] = useState(meme.imageUrl);

  const handleImageError = () => {
    setImgSrc("https://placehold.co/600x400?text=Meme+image");
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="relative">
        <img
          src={imgSrc}
          alt={meme.name}
          className="w-full h-48 object-cover"
          onError={handleImageError}
        />
        <Badge className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full flex items-center text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          {meme.likes}
        </Badge>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
            {meme.name}
          </h3>
          <span className="text-xs text-gray-500">ID: {meme.id}</span>
        </div>
        <a
          href={meme.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline text-sm inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          Open Image
        </a>
      </div>
    </Card>
  );
}
