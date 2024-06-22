import { z } from 'zod';

const datetimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

export const eventSchema = z.object({
  name: z.string().min(3, 'Le nom de l\'événement doit contenir au moins 3 caractères'),
  date_start: z.string().refine((value) => datetimeRegex.test(value), {
    message: 'La date de début doit être au format YYYY-MM-DDTHH:mm',
  }),
  date_end: z.string().refine((value) => datetimeRegex.test(value), {
    message: 'La date de début doit être au format YYYY-MM-DDTHH:mm',
  }),
  location: z.string().optional(),
  note: z.string().optional(),
  type: z.string(),
});
