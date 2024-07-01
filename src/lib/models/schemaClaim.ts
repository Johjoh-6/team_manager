import { z } from 'zod';


export const claimSchema = z.object({
    id: z.string().optional(),
    teamID: z.string().optional(),
    userID: z.string().optional(),
    playerID: z.string().optional(),
    status: z.enum(['pending', 'approved', 'rejected'])
});
