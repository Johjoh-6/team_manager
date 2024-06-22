import { z } from 'zod';

const ACCEPTED_FILE_TYPE = ['image/png', 'image/jpeg', 'image/jpg'];
const TeamSchema = z.object({
	name: z.string().min(3, "Le nom de l'équipe doit contenir au moins 3 caractères"),
	description: z.string().optional(),
	sport: z.string().optional(),
	manager: z.string(),
	players: z.array(z.string()).optional(),
	logo: z
		.instanceof(File, { message: 'Veuillez selectionner une image.' })
		.refine((file) => file.size < 1000000, { message: "L'image est trop lourde" })
		.refine((file) => ACCEPTED_FILE_TYPE.includes(file.type), {
			message: "Le fichier n'est pas une image"
		})
		.optional(),
	contact_info: z.string().optional(),
	location: z.string().optional()
});

export { TeamSchema };
