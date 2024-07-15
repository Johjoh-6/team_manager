import { Roles } from '$lib/enum/rolesEnum';
import isRole from '$lib/utils/isRole';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { claimSchema } from '$lib/models/schemaClaim';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async ({ locals, url, parent }) => {
	try {
		const { team } = await parent();
		if (!team) {
			throw new Error('Team not found');
		}
		if (!isRole(Roles.MANAGER, locals.user?.expand.role)) {
			throw new Error('Forbidden');
		}
		const page = Number(url.searchParams.get('page')) || 1;
		const perPage = Number(url.searchParams.get('perPage')) || 10;
		const search = url.searchParams.get('search') || '';

		let filterString = 'teamID={:team} && created>{:sevenDaysAgo}';
		let filterParam: Record<string, any> = { team: team.id, sevenDaysAgo: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()};
		if (search) {
			filterString += `&& (playerID.first_name~"${search}" || playerID.last_name~"${search}")`;
			filterParam = { ...filterParam, search: search};
		}
		const option: Record<string, string> = {
			expand: 'playerID',
			fields: '*,expand.playerID.last_name,expand.playerID.first_name',
			filter: locals.pb.filter(filterString, filterParam)
		};
		
		const claims = await locals.pb.collection('claim_requests').getList(page, perPage, option);
		return {
			claims: claims.items,
			totalPages: claims.totalPages,
			currentPage: claims.page,
			totalItems: claims.totalItems,
			perPage: claims.perPage
		};
	} catch (_) {
		redirect(303, '/');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(claimSchema));

		if (!form.valid) {
			return message(form, 'Champs manquant', {
				status: 400
			});
		}

		if (!locals.pb.authStore.isValid) {
			error(401, 'Unauthorized');
		}
		if (!isRole(Roles.MANAGER, locals.user?.expand.role)) {
			error(403, 'Forbidden');
		}
		if (!form.data.id) {
			error(400, 'Bad Request');
		}
		try {
			const update = await locals.pb.collection('claim_requests').update(form.data.id, form.data);
			if (update.status === 'approved') {
				const player = await locals.pb.collection('players').update(update.playerID, {
					user_link: update.userID
				});
				if (player) {
					return { update: true };
				}
				return {
					error: true
				};
			}

			if (update) {
				return { update: true };
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
