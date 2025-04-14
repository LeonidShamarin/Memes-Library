import { z } from 'zod';

export const memeSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(100),
  imageUrl: z.string().url(),
  likes: z.number().int().min(0).max(99)
});