import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, locals }) => {
	if (!locals.user) {
		redirect(303, '/login');
	}

	try {
		const page = Number(url.searchParams.get('page')) || 1;
		const perPage = Number(url.searchParams.get('perPage')) || 10;
		const search = url.searchParams.get('search') || '';

		let filterString = 'date_start > @now';
		let filterParam: Record<string, any> = {};
		if (search) {
			filterString += "&& name~{:search}";
			filterParam = { search };
		}

		const option: Record<string, string> = {
			expand: 'type',
			fields: '*,expand.type.name',
			filter: locals.pb.filter(filterString, filterParam),
			sort: 'date_start'
		};
		const events = await locals.pb.collection('events').getList(page, perPage, option);

		return {
			events: events.items,
			totalPages: events.totalPages,
			currentPage: events.page,
			totalItems: events.totalItems,
			perPage: events.perPage
		};
	} catch (error) {
		console.error(error);
		return {
			events: [],
			totalPages: 0,
			currentPage: 0,
			totalItems: 0,
			perPage: 0
		};
	}
}) satisfies PageServerLoad;
