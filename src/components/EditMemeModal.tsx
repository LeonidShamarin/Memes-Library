'use client';

import { useState, useEffect } from 'react';
import { Meme } from '../types';
import { memeSchema } from '../utils/validators';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  Input
} from '@heroui/react';

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

  if (!isOpen || !formData) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={() => onClose()}>
      <ModalContent>
        <ModalHeader>
          <h3 className="text-lg font-semibold">Edit Meme</h3>
        </ModalHeader>
        
        <ModalBody>
          <div className="space-y-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium mb-1">ID</label>
              <Input
                id="id"
                value={formData.id.toString()}
                disabled
              />
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">Image URL</label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
              {errors.imageUrl && <p className="text-sm text-red-600 mt-1">{errors.imageUrl}</p>}
            </div>
            
            <div>
              <label htmlFor="likes" className="block text-sm font-medium mb-1">Likes</label>
              <Input
                type="number"
                id="likes"
                name="likes"
                min="0"
                value={formData.likes.toString()}
                onChange={handleChange}
              />
              {errors.likes && <p className="text-sm text-red-600 mt-1">{errors.likes}</p>}
            </div>
          </div>
        </ModalBody>
        
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="solid" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
