"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import EditMemeModal from "./EditMemeModal";
import { Meme } from "../types";
import { useMemesStorage } from "../hooks/useMemesStorage";

export default function AddMemeButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { memes, updateMeme } = useMemesStorage();

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleSave = (newMeme: Meme) => {
    updateMeme(newMeme);
    setIsModalOpen(false);
  };

  const emptyMeme: Meme = {
    id: memes.length > 0 ? Math.max(...memes.map((meme) => meme.id)) + 1 : 1,
    name: "",
    imageUrl: "",
    likes: Math.floor(Math.random() * 99),
  };

  return (
    <>
      <Button
        variant="solid"
        color="primary"
        onPress={handleAddClick}
        className="mb-4"
      >
        Add a New Meme
      </Button>

      <EditMemeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        meme={emptyMeme}
        onSave={handleSave}
      />
    </>
  );
}