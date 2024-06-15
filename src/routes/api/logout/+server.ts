import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	await locals.pb.authStore.clear();
	locals.user = undefined;

	return json({ logout: true });
};
