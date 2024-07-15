import { z } from 'zod';

const ACCEPTED_FILE_TYPE = ['image/png', 'image/jpeg', 'image/jpg'];
const PlayerSchema = z.object({
	id: z.string().optional(),
	first_name: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
	last_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
	player_number: z.number().int().nonnegative().optional(),
	picture: z
		.instanceof(File, { message: 'Veuillez selectionner une image.' })
		.refine((file) => file.size < 1000000, { message: "L'image est trop lourde" })
		.refine((file) => ACCEPTED_FILE_TYPE.includes(file.type), {
			message: "Le fichier n'est pas une image"
		})
		.optional(),
	position: z.string().optional(),
	bod: z.string().optional(),
	height: z.number().int().nonnegative().optional(),
	weight: z.number().int().nonnegative().optional(),
	biography: z.string().optional(),
	claimed: z.boolean().optional(),
	user_link: z.string().optional(),
	handi_point: z.number().int().optional(),
	handi_comment: z.string().optional()
});

export { PlayerSchema };
