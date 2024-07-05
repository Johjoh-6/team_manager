import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { UserSchema } from '$lib/models/schemaUser';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ClientResponseError } from 'pocketbase';

export const load = (async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		redirect(303, '/');
	}
	const form = await superValidate(zod(UserSchema));

	return { form, isConnected: false };
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ request, locals }) => {
		const form = await superValidate(request, zod(UserSchema));
		if (!form.valid) {
			return message(form, 'Email ou mots de passe incorrects', {
				status: 400
			});
		}
		try {
			await locals.pb.collection('users').authWithPassword(form.data.email, form.data.password, {
				expand: 'role',
				fields: '*,expand.role.name'
			});
			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return message(
					form,
					"Votre compte n'est pas vérifié. Vérifiez votre boîte de réception pour le lien de vérification.",
					{
						status: 400
					}
				);
			}
		} catch (err) {
			console.error('Error: ', err);
			if (err instanceof ClientResponseError) {
				if (err.status === 400) {
					return message(form, 'Email ou mots de passe incorrects', {
						status: 400
					});
				}
			}
			error(500, {
				message: "Quelque chose s'est mal passé lors de la connexion. Veuillez réessayer plus tard."
			});
		}
		return { form };
	},
};
