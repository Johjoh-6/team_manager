import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { UserPasswordSchema } from '$lib/models/schemaUser';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms';
import { ClientResponseError } from 'pocketbase';

export const load = (async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}

	const form = await superValidate(zod(UserPasswordSchema));
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(UserPasswordSchema));
		if (!form.valid) {
			return message(form, 'Mot de passe incorrect', {
				status: 400
			});
		}
		if (!locals.user) {
			return message(form, 'Utilisateur non trouvé', {
				status: 404
			});
		}

		try {
			await locals.pb.collection('users').update(locals.user.id, form.data);
			locals.pb.authStore.clear();
		} catch (err) {
			console.error('Error: ', err);
			if (err instanceof ClientResponseError) {
				return message(form, 'Mot de passe incorrect', {
					status: 400
				});
			}
			error(500, {
				message: "Quelque chose s'est mal passé lors de la connexion. Veuillez réessayer plus tard."
			});
		}
		return message(form, '');
	}
};
