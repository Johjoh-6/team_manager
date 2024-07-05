import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import isRole from '$lib/utils/isRole';
import { Roles } from '$lib/enum/rolesEnum';
import type { RecordListOptions } from 'pocketbase';

export const load = (async ({ locals, url }) => {
	if (!locals.user) {
		redirect(303, '/login');
	}
	try {
		const page = Number(url.searchParams.get('page')) || 1;
		const perPage = Number(url.searchParams.get('perPage')) || 10;
		const search = url.searchParams.get('search') || '';

		const option: RecordListOptions = {
			expand: 'position',
			fields: '*,expand.position.name',
			requestKey: null
		};
		if (search) {
			option.filter = `first_name~"${search}" || last_name~"${search}" || player_number~"${search}"`;
		}
		const players = await locals.pb.collection('players').getList(page, perPage, option);
		return {
			userId: locals.user.id,
			players: players.items,
			totalPages: players.totalPages,
			currentPage: players.page,
			totalItems: players.totalItems,
			perPage: players.perPage
		};
	} catch (err) {
		console.error(err);
		return {
			userId: locals.user.id,
			players: [],
			totalPages: 0,
			currentPage: 0,
			totalItems: 0,
			perPage: 0
		};
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const idToDelete = form.get('id') as string;

		console.log('delete the players', idToDelete);
		if (!idToDelete || typeof idToDelete !== 'string') {
			error(400, 'Bad Request');
		}
		if (!locals.pb.authStore.isValid) {
			error(401, 'Unauthorized');
		}
		if (!isRole(Roles.MANAGER, locals.user?.expand.role)) {
			error(403, 'Forbidden');
		}
		try {
			const deleted = await locals.pb.collection('players').delete(idToDelete);
			if (deleted) {
				return { deleted: true };
			}
			return {
				error: true
			};
		} catch (err) {
			console.error(err);
			error(500, 'Internal Server Error');
		}
	}
};
