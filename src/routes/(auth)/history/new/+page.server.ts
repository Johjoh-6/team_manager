import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ClientResponseError, type RecordModel } from 'pocketbase';
import isRole from '$lib/utils/isRole';
import { Roles } from '$lib/enum/rolesEnum';
import { matchHistorySchema } from '$lib/models/schemaMatchHistory';

export const load = (async ({ locals }) => {
	try {
		if (!isRole(Roles.MANAGER, locals.user?.expand.role)) {
			throw new Error('Forbidden');
		}

		const getTeamsList = async (): Promise<RecordModel[]> => {
			try {
				const list = await locals.pb.collection('teams').getFullList({
					fields: 'id,name'
				});
				return list ? list : [];
			} catch (err) {
				console.error('Error: ', err);
				return [];
			}
		};

		const form = await superValidate(zod(matchHistorySchema));

		return {
			teamList: await getTeamsList(),
			form
		};
	} catch (err) {
		console.error(err);
		redirect(303, '/history');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(matchHistorySchema));

		if (!form.valid) {
			return message(form, 'Champs manquant', {
				status: 400
			});
		}

		try {
			await locals.pb.collection('match_history').create(form.data);
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
