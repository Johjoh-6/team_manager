import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	try {
		const { id } = params;
		if (!id) {
			throw new Error('Id is missing');
		}
		const teamId = await locals.pb.collection('teams').getOne(id, {
			fields:
				'*,expand.manager.last_name,expand.manager.id,expand.manager.first_name,expand.sport.name,expand.players.last_name,expand.players.picture,expand.players.collectionId,expand.players.id,expand.players.first_name,expand.players.player_number,expand.players.expand.position.name',
			expand: 'sport,manager,players.position'
		});
		return { teamId };
	} catch (err) {
		console.error(err);
		redirect(303, '/teams');
	}
}) satisfies PageServerLoad;
