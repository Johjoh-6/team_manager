import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({locals}) => {
    try {
		const roadmap = await locals.pb.collection('roadmap').getFullList();

		return {
			roadmap: roadmap
		};
    } catch (err) {
        // console.error(err);
        error(500, err?.message ?? 'Erreur inconnue');
    }
}) satisfies PageServerLoad;