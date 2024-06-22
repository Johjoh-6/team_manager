import type { LayoutServerLoad } from './$types';

export const load = (async ({locals,url }) => {
    try{
        if(!locals.user){
            throw new Error();
        }
        
        const page = Number(url.searchParams.get('page')) || 1;
		const perPage = Number(url.searchParams.get('perPage')) || 10;
		const search = url.searchParams.get('search') || '';

		const option: Record<string, string> = {
            expand: 'position',
            fields: '*,expand.position.name'
        };
		if (search) {
			option.filter = `first_name~"${search}" || last_name~"${search}" || player_number~"${search}"`;
		}
		const players = await locals.pb.collection('players').getList(page, perPage, option);

		return {
			players: players.items,
			totalPages: players.totalPages,
			currentPage: players.page,
			totalItems: players.totalItems,
			perPage: players.perPage
		};
    } catch (err) {
        console.error(err);
        return {
			players: [],
			totalPages: 0,
			currentPage: 0,
			totalItems: 0,
			perPage: 0
		};
    }
}) satisfies LayoutServerLoad;