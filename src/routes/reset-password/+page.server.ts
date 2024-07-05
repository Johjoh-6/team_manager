import { message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { UserEmailSchema } from '$lib/models/schemaUser';

export const load = (async () => {
    const form = await superValidate(zod(UserEmailSchema));

	return { form, isConnected: false };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, locals }) => {
        const form = await superValidate(request, zod(UserEmailSchema));

		try {
			await locals.pb.collection('users').requestPasswordReset(form.data.email);
		} catch (err) {
			console.log('Error: ', err);
			return message(form, 'Erreur durant la demande de réinitialisation de mot de passe.', {
                status: 400
            });
		}
        return message(form, '');
    }
};