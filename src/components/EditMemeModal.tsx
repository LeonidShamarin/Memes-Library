"use client";

import { useState, useEffect } from "react";
import { Modal, Input, Button } from "@heroui/react";
import { Meme } from "../types";

interface EditMemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  meme: Meme | null;
  onSave: (meme: Meme) => void;
}

export default function EditMemeModal({
  isOpen,
  onClose,
  meme,
  onSave,
}: EditMemeModalProps) {
  const [formData, setFormData] = useState<Meme>({
    id: 0,
    name: "",
    imageUrl: "",
    likes: 0,
  });
  const [errors, setErrors] = useState({
    name: "",
    imageUrl: "",
    likes: "",
  });

  useEffect(() => {
    if (meme) {
      setFormData({ ...meme });
    }
  }, [meme]);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return (
        url.endsWith(".jpg") ||
        url.endsWith(".jpeg") ||
        url.endsWith(".png") ||
        url.endsWith(".gif")
      );
    } catch (e) {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      imageUrl: "",
      likes: "",
    };
    let isValid = true;

    if (
      !formData.name ||
      formData.name.length < 3 ||
      formData.name.length > 100
    ) {
      newErrors.name = "Name must be between 3 and 100 characters";
      isValid = false;
    }

    if (!formData.imageUrl || !validateUrl(formData.imageUrl)) {
      newErrors.imageUrl =
        "Please enter a valid image URL (jpg, jpeg, png or gif format)";
      isValid = false;
    }

    const likesNum = Number(formData.likes);
    if (
      isNaN(likesNum) ||
      !Number.isInteger(likesNum) ||
      likesNum < 0 ||
      likesNum > 99
    ) {
      newErrors.likes = "Likes must be a whole number between 0 and 99";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "likes" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const [previewSrc, setPreviewSrc] = useState("");
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (validateUrl(formData.imageUrl)) {
      setPreviewSrc(formData.imageUrl);
      setPreviewError(false);
    } else {
      setPreviewSrc("");
    }
  }, [formData.imageUrl]);

  const handleImageError = () => {
    setPreviewError(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto"
          style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
          <div className="bg-primary-600 p-4 text-white rounded-t-lg">
            <h2 className="text-xl font-bold">
              {meme && meme.id ? "Edit Meme" : "Add New Meme"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter meme name"
                className="w-full"
              />
              {errors.name && (
                <div className="mt-1 text-sm text-danger-500">
                  {errors.name}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="imageUrl"
                className="block font-medium text-gray-700 mb-1"
              >
                Image URL
              </label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL (jpg, jpeg, png, gif)"
                className="w-full"
              />
              {errors.imageUrl && (
                <div className="mt-1 text-sm text-danger-500">
                  {errors.imageUrl}
                </div>
              )}
            </div>

            {/* Image Preview */}
            {previewSrc && !previewError && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
                <div className="border rounded-md overflow-hidden bg-gray-50 h-40 flex items-center justify-center">
                  <img
                    src={previewSrc}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                    onError={handleImageError}
                  />
                </div>
              </div>
            )}

            {previewError && (
              <div className="mb-4 p-3 bg-red-50 text-danger-500 rounded-md text-sm">
                Unable to load image preview. Please check the URL.
              </div>
            )}

            <div className="mb-6">
              <label
                htmlFor="likes"
                className="block font-medium text-gray-700 mb-1"
              >
                Likes
              </label>
              <Input
                id="likes"
                name="likes"
                type="number"
                min="0"
                max="99"
                value={String(formData.likes)}
                onChange={handleChange}
                placeholder="Enter number of likes (0-99)"
                className="w-full"
              />
              {errors.likes && (
                <div className="mt-1 text-sm text-danger-500">
                  {errors.likes}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="flat"
                color="danger"
                onPress={onClose}
                className="px-4"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="solid"
                color="primary"
                className="px-4"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
