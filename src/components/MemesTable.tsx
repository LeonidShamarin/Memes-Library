'use client';

import { useState } from 'react';
import { Table, Button } from '@heroui/react';
import { Meme } from '../types';
import EditMemeModal from './EditMemeModal';
import { useMemesStorage } from '../hooks/useMemesStorage';

export default function MemesTable() {
  const { memes, updateMeme, isLoading } = useMemesStorage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);

  const handleEditClick = (meme: Meme) => {
    setSelectedMeme(meme);
    setIsModalOpen(true);
  };

  const handleSave = (updatedMeme: Meme) => {
    updateMeme(updatedMeme);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Завантаження...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Таблиця мемів</h1>
      
      <div className="overflow-x-auto">
        <Table className="min-w-full divide-y divide-gray-200">
          <Table.Head>
            <Table.Row>
              <Table.Header scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </Table.Header>
              <Table.Header scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Назва
              </Table.Header>
              <Table.Header scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL зображення
              </Table.Header>
              <Table.Header scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Лайки
              </Table.Header>
              <Table.Header scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дії
              </Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body className="bg-white divide-y divide-gray-200">
            {memes.map((meme) => (
              <Table.Row key={meme.id} className="transition-colors hover:bg-gray-50">
                <Table.Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {meme.id}
                </Table.Cell>
                <Table.Cell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {meme.name}
                </Table.Cell>
                <Table.Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                  {meme.imageUrl}
                </Table.Cell>
                <Table.Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {meme.likes}
                </Table.Cell>
                <Table.Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEditClick(meme)}
                    className="text-sm"
                  >
                    Редагувати
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      
      <EditMemeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        meme={selectedMeme}
        onSave={handleSave}
      />
    </div>
  );
}
