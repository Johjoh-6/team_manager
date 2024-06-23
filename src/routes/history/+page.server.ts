import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({locals, url}) => {
    if (!locals.user) {
		redirect(303, '/login');
	}

	try {
		const page = Number(url.searchParams.get('page')) || 1;
		const perPage = Number(url.searchParams.get('perPage')) || 10;
		const search = url.searchParams.get('search') || '';

		const option: Record<string, string> = {
            expand: 'team_opponent,team',
            // fields: '*,expand.team.name,expand.team_opponent.name,expand.team.logo,expand.team_opponent.logo,expand.team.sport.name,expand.team.collectionId,expand.team.id,expand.team_opponent.id'
        };
		if (search) {
			option.filter = `name~"${search}" || team_opponent_name~"${search}"`;
		}
		const histories = await locals.pb.collection('match_history').getList(page, perPage, option);

		return {
			histories: histories.items,
			totalPages: histories.totalPages,
			currentPage: histories.page,
			totalItems: histories.totalItems,
			perPage: histories.perPage
		};
	} catch (error) {
		console.error(error);
		return {
			histories: [],
			totalPages: 0,
			currentPage: 0,
			totalItems: 0,
			perPage: 0
		};
	}
}) satisfies PageServerLoad;