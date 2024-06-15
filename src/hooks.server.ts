import PocketBase, { type AuthModel } from 'pocketbase';

import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import { serializeNonPOJOs } from '$lib/utils/serializeNonPojos';
import type { AuthSystemFields, TypedPocketBase, UsersRecord } from '$lib/models/pocketbase-types';

export const handle: Handle = async ({ event, resolve }) => {
	// event.locals.pb = new PocketBase(env.PUBLIC_API_URL) as TypedPocketBase;
	event.locals.pb = new PocketBase(env.PUBLIC_API_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh({
				expand: 'role',
				fields: '*,expand.role.name'
			});
			// Add type user
			event.locals.user = serializeNonPOJOs<AuthModel>(event.locals.pb.authStore.model);
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

	return response;
};
