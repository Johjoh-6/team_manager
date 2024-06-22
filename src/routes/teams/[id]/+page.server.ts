import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { team } = await parent();
	const { id } = params;
	if (!id) {
		redirect(303, '/');
	}
	if (!team) {
		redirect(303, '/');
	}

    
	return { team };
}) satisfies PageServerLoad;
