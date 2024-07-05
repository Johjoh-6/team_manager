import { z } from 'zod';

// Define outside the load function so the adapter can be cached
const UserSchema = z.object({
	email: z.string().email('Email invalide'),
	password: z
		.string()
		.min(8, 'Le mot de passe doit contenir au moins 8 caractères')
		.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
			message:
				'Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial (@ $ ! % * # ? &)'
		})
});

const UserDataSchema = z.object({
	username: z
		.string()
		.min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
		.optional(),
	last_name: z.string().optional(),
	first_name: z.string().optional()
});

const UserRegisterSchema = UserSchema.extend({
	passwordConfirm: z.string(),
	username: z
		.string()
		.min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
		.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
			message:
				'Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial (@ $ ! % * # ? &)'
		})
		.optional()
}).refine((data) => data.password === data.passwordConfirm, {
	message: 'Les mots de passe ne correspondent pas'
});

const UserEmailSchema = z.object({
	email: z.string().email('Email invalide')
});

const UserUsernameSchema = z.object({
	username: z.string().min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
});

const UserPasswordSchema = z
	.object({
		oldPassword: z.string({ required_error: "L'ancien mots de passe est requit" }),
		password: z
			.string({ required_error: 'Le mot de passe est requis' })
			.min(8, 'Le mot de passe doit contenir au moins 8 caractères')
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial (@ $ ! % * # ? &)'
			}),
		passwordConfirm: z.string({ required_error: 'La confirmation du mot de passe est requise' })
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Les mots de passe ne correspondent pas'
	});

export {
	UserSchema,
	UserDataSchema,
	UserRegisterSchema,
	UserEmailSchema,
	UserUsernameSchema,
	UserPasswordSchema
};
