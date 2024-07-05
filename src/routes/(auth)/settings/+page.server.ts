import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	} else {
		redirect(303, '/settings/profile');
	}
}) satisfies PageServerLoad;
