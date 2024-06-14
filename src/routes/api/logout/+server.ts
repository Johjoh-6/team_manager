import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({locals}) => {
    await locals.pb.authStore.clear();
	return json({ logout: true });
};