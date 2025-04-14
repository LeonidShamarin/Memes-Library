'use client';

import { Select } from '@heroui/react';

type SortOption = 'id-asc' | 'id-desc' | 'name-asc' | 'name-desc' | 'likes-asc' | 'likes-desc';

interface SortDropdownProps {
  onSort: (sortOption: SortOption) => void;
}

export default function SortDropdown({ onSort }: SortDropdownProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSort(e.target.value as SortOption);
  };
  
  return (
    <div className="mb-4 w-full md:w-48">
      <Select onChange={handleSortChange} className="w-full">
        <option value="id-asc">ID (за зростанням)</option>
        <option value="id-desc">ID (за спаданням)</option>
        <option value="name-asc">Назва (А-Я)</option>
        <option value="name-desc">Назва (Я-А)</option>
        <option value="likes-asc">Лайки (за зростанням)</option>
        <option value="likes-desc">Лайки (за спаданням)</option>
      </Select>
    </div>
  );
}
