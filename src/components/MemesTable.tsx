"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Meme } from "../types";
import EditMemeModal from "./EditMemeModal";
import AddMemeButton from "./AddMemeButton";
import SearchBar from "./SearchBar";

import { useMemesStorage } from "../hooks/useMemesStorage";

export default function MemesTable() {
  const { memes, updateMeme, deleteMeme, handleSearch, isLoading } =
    useMemesStorage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);

  const handleEditClick = (meme: Meme) => {
    setSelectedMeme(meme);
    setIsModalOpen(true);
  };

  const handleSave = (updatedMeme: Meme) => {
    updateMeme(updatedMeme);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this meme?")) {
      deleteMeme(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Meme Table</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        <AddMemeButton />
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image URL
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Likes
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {memes.length > 0 ? (
              memes.map((meme) => (
                <tr
                  key={meme.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {meme.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {meme.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                    {meme.imageUrl}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {meme.likes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Button
                        variant="bordered"
                        size="sm"
                        onPress={() => handleEditClick(meme)}
                        className="text-sm"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="flat"
                        color="danger"
                        size="sm"
                        onPress={() => handleDelete(meme.id)}
                        className="text-sm"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No memes found matching the search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
