import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ClientResponseError, type RecordModel } from 'pocketbase';
import { serialize } from 'object-to-formdata';
import { PlayerSchema } from '$lib/models/schemaPlayer';
import formatDateTime from '$lib/utils/formatDateTime';

export const load = (async ({ locals, params }) => {
	try {
		const { id } = params;
		if (!locals.user) {
			redirect(303, '/login');
		}
		const player = await locals.pb.collection('players').getOne(id, {
			expand: 'player_via_team'
		});

		const getPositionList = async (): Promise<RecordModel[]> => {
			try {
				const list = await locals.pb.collection('positions').getFullList();
				return list ? list : [];
			} catch (err) {
				console.log('Error: ', err);
				return [];
			}
		};

		const playerData = {
			...player,
			bod: formatDateTime(player.bod, false)
		};

		const form = await superValidate(playerData, zod(PlayerSchema));

		return {
			positionList: await getPositionList(),
			form
		};
	} catch (err) {
		console.error(err);
		redirect(303, '/players');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals, params }) => {
		const { id } = params;
		const form = await superValidate(request, zod(PlayerSchema));

		if (!form.valid) {
			return message(form, 'Champs manquant', {
				status: 400
			});
		}

		try {
			// serialize remove the undefined values and clean the object
			await locals.pb.collection('players').update(id, serialize(form.data));
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
