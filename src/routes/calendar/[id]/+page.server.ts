import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import isRole from '$lib/utils/isRole';
import { Roles } from '$lib/enum/rolesEnum';

export const load = (async ({ locals, params }) => {
	const { id } = params;
	try {
		const event = await locals.pb.collection('events').getOne(id, {
			expand: 'type',
			fields: '*,expand.type.name'
		});
		return { event };
	} catch (err) {
		console.error(err);
		redirect(303, '/calendar');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, params }) => {
		const { id } = params;
		console.log('delete the event', id);
		if (!locals.pb.authStore.isValid) {
			error(401, 'Unauthorized');
		}
		if (!isRole(Roles.MANAGER, locals.user?.expand.role)) {
			error(403, 'Forbidden');
		}
		try {
			const deleted = await locals.pb.collection('events').delete(id);
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
