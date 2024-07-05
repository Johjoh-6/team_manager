import { message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { eventSchema } from '$lib/models/schemaEvent';
import { error, redirect } from '@sveltejs/kit';
import isRole from '$lib/utils/isRole';
import { Roles } from '$lib/enum/rolesEnum';
import formatDateTime from '$lib/utils/formatDateTime';
import { ClientResponseError } from 'pocketbase';

export const load = (async ({ locals, params }) => {
	try {
		const { id } = params;
		if (!isRole(Roles.MANAGER, locals.user?.expand.role)) {
			throw new Error('Forbidden');
		}
		// Fetch the event
		const event = await locals.pb.collection('events').getOne(id, {
			expand: 'type',
			fields: '*,expand.type.name'
		});

		const eventType = await locals.pb.collection('event_type').getFullList();

		const eventData = {
			name: event.name,
			date_start: formatDateTime(event.date_start),
			date_end: formatDateTime(event.date_end),
			location: event.location,
			note: event.note,
			type: event.type
		};
		const form = await superValidate(eventData, zod(eventSchema));

		return {
			event,
			eventType,
			form
		};
	} catch (err) {
		console.error(err);
		redirect(303, '/calendar');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, params, request }) => {
		const { id } = params;

		const form = await superValidate(request, zod(eventSchema));
		if (!form.valid) {
			return { form };
		}

		try {
			// transform the date to the right format
			form.data.date_start = new Date(form.data.date_start).toISOString();
			form.data.date_end = new Date(form.data.date_end).toISOString();
			// Update the event data in your database
			await locals.pb.collection('events').update(id, form.data);
			return message(form, '');
		} catch (err) {
			console.error('Error: ', err);
			if (err instanceof ClientResponseError) {
				if (err.status === 400) {
					return message(form, 'Erreur lors de la modification', {
						status: 400
					});
				}
			}
			error(500, {
				message: "Quelque chose s'est mal passé lors de la connexion. Veuillez réessayer plus tard."
			});
		}
		return { form };
	}
};
