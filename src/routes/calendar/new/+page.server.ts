import { message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { eventSchema } from '$lib/models/schemaEvent';
import { error, redirect } from '@sveltejs/kit';
import isRole from '$lib/utils/isRole';
import { Roles } from '$lib/enum/rolesEnum';
import { ClientResponseError } from 'pocketbase';

export const load = (async ({ locals }) => {
	try {
		if (!isRole(Roles.MANAGER, locals.user?.expand.role)) {
			throw new Error('Forbidden');
		}

		const eventType = await locals.pb.collection('event_type').getFullList();

		
		const form = await superValidate(zod(eventSchema));

		return {
			eventType,
			form
		};
	} catch (err) {
		console.error(err);
		redirect(303, '/calendar');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, zod(eventSchema));
		console.log('form', form);
		if (!form.valid) {
			return { form };
		}
		
		  try {
			// transform the date to the right format
			form.data.date_start = new Date(form.data.date_start).toISOString();
			form.data.date_end = new Date(form.data.date_end).toISOString();
            
			// create the event data in your database
			await locals.pb.collection('events').create(form.data);
			return message(form, '');
		  } catch (err) {
			console.error('Error: ', err);
			if (err instanceof ClientResponseError) {
				if (err.status === 400) {
					return message(form, "Erreur lors de la création", {
						status: 400
					});
				}
			}
			error(500, {
				message: "Quelque chose s'est mal passé lors de la connexion. Veuillez réessayer plus tard."
			});
		}
	},
};