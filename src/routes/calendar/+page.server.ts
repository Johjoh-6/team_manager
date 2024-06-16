import type { PageServerLoad } from './$types';

export const load = (async ({url, locals}) => {
    if (!locals.user) {
        throw new Error();
    }

    try {
        const page = Number(url.searchParams.get('page')) || 1;
        const perPage = Number(url.searchParams.get('perPage')) || 10;
        const search = url.searchParams.get('search') || '';

        const option: Record<string,string> = {
            expand: 'type',
            fields: '*,expand.type.name',
        };
        if (search) {
            option.filter = `name~"${search}"`;
        }
        const events =  await locals.pb.collection('events').getList(page, perPage, option);

        return {
            events: events.items,
            totalPages: events.totalPages,
            currentPage: events.page,
            totalItems: events.totalItems,
            perPage: events.perPage

        }
    } catch (error) {
        return {
            events: [],
            totalPages: 0,
            currentPage: 0,
            totalItems: 0,
            perPage: 0,
        }
    }
}) satisfies PageServerLoad;