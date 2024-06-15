import { z } from 'zod';

// Define outside the load function so the adapter can be cached
const UserSchema = z.object({
	email: z.string().email('Email invalide'),
	password: z
		.string()
		.min(8, 'Le mot de passe doit contenir au moins 8 caractères')
		.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
			message:
				'Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial'
		})
});

const UserRegisterSchema = UserSchema.extend({
	passwordConfirmation: z.string(),
	username: z
		.string()
		.min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
		.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
			message:
				'Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial'
		})
		.optional()
}).refine((data) => data.password === data.passwordConfirmation, {
	message: 'Les mots de passe ne correspondent pas'
});

export { UserSchema, UserRegisterSchema };
