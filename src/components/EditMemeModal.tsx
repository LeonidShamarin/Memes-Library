'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Input, Label } from '@heroui/react';
import { Meme } from '../types';
import { memeSchema } from '../utils/validators';

interface EditMemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  meme: Meme | null;
  onSave: (meme: Meme) => void;
}

export default function EditMemeModal({ isOpen, onClose, meme, onSave }: EditMemeModalProps) {
  const [formData, setFormData] = useState<Meme | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (meme) {
      setFormData({ ...meme });
    }
  }, [meme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    
    const { name, value } = e.target;
    let parsedValue: string | number = value;
    
    if (name === 'likes') {
      parsedValue = value === '' ? 0 : parseInt(value, 10);
    }
    
    setFormData({ ...formData, [name]: parsedValue });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    try {
      if (formData) {
        memeSchema.parse(formData);
        return true;
      }
      return false;
    } catch (error: any) {
      const formattedErrors: { [key: string]: string } = {};
      if (error.errors) {
        error.errors.forEach((err: any) => {
          const path = err.path[0];
          formattedErrors[path] = err.message;
        });
      }
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleSubmit = () => {
    if (validateForm() && formData) {
      onSave(formData);
      onClose();
    }
  };

  if (!formData) return null;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Modal.Content className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <Modal.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                    Редагування мема
                  </Modal.Title>
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</Label>
                      <Input
                        type="text"
                        name="id"
                        id="id"
                        value={formData.id}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-100"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Назва</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL зображення</Label>
                      <Input
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                      {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="likes" className="block text-sm font-medium text-gray-700">Кількість лайків</Label>
                      <Input
                        type="number"
                        name="likes"
                        id="likes"
                        min="0"
                        max="99"
                        value={formData.likes}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                      {errors.likes && <p className="mt-1 text-sm text-red-600">{errors.likes}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button
                type="button"
                variant="primary"
                onClick={handleSubmit}
                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
              >
                Зберегти
              </Button>
              <Button
                type="button"
                variant="white"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Скасувати
              </Button>
            </div>
          </Modal.Content>
        </div>
      </div>
    </Modal>
  );
}




