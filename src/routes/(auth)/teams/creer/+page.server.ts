import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { TeamSchema } from '$lib/models/schemaTeam';
import { ClientResponseError, type RecordModel } from 'pocketbase';
import { serialize } from 'object-to-formdata';

export const load = (async ({ parent, locals }) => {
	const { team } = await parent();
	if (team) {
		redirect(303, '/');
	}
	const form = await superValidate(zod(TeamSchema));

	const getListSport = async (): Promise<RecordModel[]> => {
		try {
			const list = await locals.pb.collection('sports').getFullList();
			return list ? list : [];
		} catch (err) {
			console.error('Error: ', err);
			return [];
		}
	};
	return { form, isConnected: false, sportList: await getListSport() };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(TeamSchema));
		const idUser = locals?.user?.id ?? '';
		form.data.manager = idUser;
		if (!form.valid) {
			return message(form, 'Champs manquant', {
				status: 400
			});
		}

		try {
			// serialize remove the undefined values and clean the object
			await locals.pb.collection('teams').create(serialize(form.data));
		} catch (err) {
			console.error('Error: ', err);
			if (err instanceof ClientResponseError) {
				if (err.status === 400) {
					return message(form, 'Problème de création', {
						status: 400
					});
				}
			}
			error(500, {
				message: "Quelque chose s'est mal passé lors de la connexion. Veuillez réessayer plus tard."
			});
		}
		// return an empty message for avoid an error for non pojo response
		return message(form, '');
	}
};
