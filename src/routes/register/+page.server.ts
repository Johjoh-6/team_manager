import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import {UserRegisterSchema} from '$lib/models/schemaUser';
import { ClientResponseError } from 'pocketbase';

export const load = (async ({locals}) => {
    if (locals.pb.authStore.isValid) {
		redirect(303, '/teams');
	}
	const form = await superValidate(zod(UserRegisterSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions = {
    register: async ({ request, locals }) => {
		const form = await superValidate(request, zod(UserRegisterSchema));
		console.log('form', form);
		if (!form.valid) {
			return message(form, 'Champs manquant', {
				status: 400
			})
        }
        // by default the role is set to 'user' and evolve
		try {
			await locals.pb.collection('users').create({
                email: form.data.email,
                password: form.data.password,
                passwordConfirm: form.data.passwordConfirmation,
                username: form.data.username,
            });
			await locals.pb.collection('users').requestVerification(form.data.email);
			console.log('User registered');
		} catch (err) {
			console.error('Error: ', err);
			if (err instanceof ClientResponseError) {
					return message(form, 'Erreur durant l\'enregistrement. Email invalide ou déjà utilisé.', {
						status: 400
					});
			}
			error(500, {
				message: 'Something went wrong registering'
			});
		}
		console.log('form', form);
		return form;
	}
};