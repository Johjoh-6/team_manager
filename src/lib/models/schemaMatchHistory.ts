import { z } from 'zod';

export const matchHistorySchema = z.object({
    name: z.string().min(3, 'Le nom de l\'événement doit contenir au moins 3 caractères'),
    description: z.string().optional(),
    match_date: z.string(),
    team: z.string().optional(),
    team_opponent: z.string().optional(),
    team_opponent_name: z.string().optional(),
    score: z.number().nonnegative().optional(),
    score_opponent: z.number().nonnegative().optional(),
});
