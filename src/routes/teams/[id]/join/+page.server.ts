import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ClientResponseError } from 'pocketbase';

export const load = (async ({params, locals}) => {
    if (!locals.user) {
        redirect(303, '/login');
    }
    try {
		const { id } = params;
		if (!id) {
			throw new Error('Id is missing');
		}
		const teamData = await locals.pb.collection('teams').getOne(id, {
			fields: '*,expand.sport.name,expand.players.*',
			expand: 'sport,players.position',
		});
		return { teamData };
	} catch (err) {
		console.error(err);
		redirect(303, '/teams');
	}
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, locals, params }) => {
		const { id } = params;
		if(!locals.user){
			error(401, 'Unauthorized');
		}
		const form = await request.formData();
		const idToClaim = form.get('idPlayer') as string;

		console.log('claim id', idToClaim);
		if(typeof idToClaim !== 'string'){
			error(400, 'Bad Request');
		}
		try {
			const player = await locals.pb.collection('players').getOne(idToClaim);
			if(!player){
				return {
					error: true
				}
			}
			if(player.claimed){
				error(400, 'Bad Request');
			}
			const claim = await locals.pb.collection('claim_requests').create({
				playerID: idToClaim,
				teamID: id,
				status: 'pending',
				userID: locals.user.id
			});
			if(claim){
				return {
					success: true
				}
			}
			return {
				error: true
			}
		} catch (err) {
			if (err instanceof ClientResponseError) {
				if (err.status === 400) {
					error(500, {
						message: "Quelque chose s'est mal passé lors de la connexion. Veuillez réessayer plus tard."
					});
				}
			}
			error(500, {
				message: "Quelque chose s'est mal passé lors de la connexion. Veuillez réessayer plus tard."
			});
		}

    }
};