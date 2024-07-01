import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { UserDataSchema } from '$lib/models/schemaUser';
import { ClientResponseError } from 'pocketbase';

export const load = (async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}
	try{
		const user = locals.user;
		const form = await superValidate(user, zod(UserDataSchema));
		
		return {
			form
		};
	} catch(err){
		console.log(err);
		redirect(303, '/login');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(UserDataSchema));
		if (!form.valid) {
			return message(form, 'Champs manquant', {
				status: 400
			});
		}
		if (!locals.user) {
			return message(form, 'Utilisateur non trouvé', {
				status: 404
			});
		}

					try {
						const { username } = await locals.pb
							.collection('users')
							.update(locals.user.id, form.data);
						locals.user.username = username;
					} catch (err) {
						console.log('Error: ', err);
						if (err instanceof ClientResponseError) {
							error(err.status, err.message);
						}
						error(500, {
							message:
								"Quelque chose s'est mal passé lors de la connexion. Veuillez réessayer plus tard."
						});
					}
		return {
			form
		};
	}
}