'use client';

import { useState } from 'react';
import { Input } from '@heroui/react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
  
  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search by meme name..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full md:w-64"
      />
    </div>
  );
}
