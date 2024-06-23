import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ClientResponseError, type RecordModel } from 'pocketbase';
import { serialize } from 'object-to-formdata';
import isRole from '$lib/utils/isRole';
import { Roles } from '$lib/enum/rolesEnum';
import { PlayerSchema } from '$lib/models/schemaPlayer';

export const load = (async ({ locals }) => {
    try {
		if (!isRole(Roles.MANAGER, locals.user?.expand.role)) {
			throw new Error('Forbidden');
		}

        const getPositionList = async (): Promise<RecordModel[]> => {
            try {
                const list = await locals.pb.collection('positions').getFullList();
                return list ? list : [];
            } catch (err) {
                console.log('Error: ', err);
                return [];
            }
        };
		
		const form = await superValidate(zod(PlayerSchema));

		return {
			positionList : await getPositionList(),
			form
		};
	} catch (err) {
		console.error(err);
		redirect(303, '/players');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(PlayerSchema));
		
		
		if (!form.valid) {
			return message(form, 'Champs manquant', {
				status: 400
			});
		}

		try {
            const userId = locals?.user?.id ?? '';
            const team = await locals.pb.collection('teams').getFirstListItem(`manager="${userId}"`, {
                fields: 'id'
            });
			// serialize remove the undefined values and clean the object
			const newPlayer = await locals.pb.collection('players').create(serialize(form.data));
            // add new player to the team
            await locals.pb.collection('teams').update(team.id, {
                "players+": newPlayer.id 
            });
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
