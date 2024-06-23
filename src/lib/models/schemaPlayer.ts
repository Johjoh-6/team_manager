import { z } from 'zod';

const ACCEPTED_FILE_TYPE = ['image/png', 'image/jpeg', 'image/jpg'];
const PlayerSchema = z.object({
    id: z.string().optional(),
	first_name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    last_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    player_number: z.number().int().positive().optional(),
	picture: z
		.instanceof(File, { message: 'Veuillez selectionner une image.' })
		.refine((file) => file.size < 1000000, { message: "L'image est trop lourde" })
		.refine((file) => ACCEPTED_FILE_TYPE.includes(file.type), {
			message: "Le fichier n'est pas une image"
		})
		.optional(),
	position: z.string().optional(),
    bod: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'La date de naissance doit être au format YYYY-MM-DD',
    }).optional(),
    height: z.number().int().positive().optional(),
    weight: z.number().int().positive().optional(),
    biography: z.string().optional(),
    claimed: z.boolean().optional(),
    user_link: z.string().optional(),
    handy_point: z.number().int().optional(),
    handy_comment: z.string().optional(),
});

export { PlayerSchema };
