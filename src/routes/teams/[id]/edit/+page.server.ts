import { message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { ClientResponseError, type RecordModel } from 'pocketbase';
import { serialize } from 'object-to-formdata';
import { error, redirect } from '@sveltejs/kit';
import { TeamSchema } from '$lib/models/schemaTeam';

export const load = (async ({ params, locals }) => {
	try {
		const { id } = params;
		const team = await locals.pb.collection('teams').getOne(id);

		const teamData = {
			name: team.name,
			sport: team.sport,
			players: team.players,
			description: team.description,
			logo: team.logo,
			contact_info: team.contact_info,
			location: team.location
		};
		const form = await superValidate(teamData, zod(TeamSchema));

		const getListSport = async (): Promise<RecordModel[]> => {
			try {
				const list = await locals.pb.collection('sports').getFullList();
				return list ? list : [];
			} catch (err) {
				console.log('Error: ', err);
				return [];
			}
		};
		return { form, sportList: await getListSport(), collectionId: team.collectionId, recordId: team.id};
	} catch (error) {
		console.error(error);
		redirect(303, '/teams');
	}
}) satisfies PageServerLoad;


export const actions = {
	default: async ({ request, locals, params }) => {
		const { id } = params;
		const form = await superValidate(request, zod(TeamSchema));
		const idUser = locals?.user?.id ?? '';
		form.data.manager = idUser;
		if (!form.valid) {
			return message(form, 'Champs manquant', {
				status: 400
			});
		}
		console.log('form', form);

		try {
			// serialize remove the undefined values and clean the object
			await locals.pb.collection('teams').update(id, serialize(form.data));
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
