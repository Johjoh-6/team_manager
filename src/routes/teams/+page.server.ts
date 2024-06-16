import type { PageServerLoad } from './$types';

export const load = (async ({url, locals}) => {
    if (!locals.user) {
        throw new Error();
    }

    try {
        const page = Number(url.searchParams.get('page')) || 1;
        const perPage = Number(url.searchParams.get('perPage')) || 10;
        const search = url.searchParams.get('search') || '';

        const option: Record<string,string> = {};
        if (search) {
            option.filter = `name~"${search}"`;
        }
        const teams =  await locals.pb.collection('teams_info').getList(page, perPage, option);

        return {
            teams: teams.items,
            totalPages: teams.totalPages,
            currentPage: teams.page,
            totalItems: teams.totalItems,
            perPage: teams.perPage

        }
    } catch (error) {
        return {
            teams: [],
            totalPages: 0,
            currentPage: 0,
            totalItems: 0,
            perPage: 0,
        }
    }
}) satisfies PageServerLoad;