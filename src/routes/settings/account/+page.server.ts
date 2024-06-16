import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { UserEmailSchema, UserUsernameSchema } from '$lib/models/schemaUser';
import { ClientResponseError } from 'pocketbase';

export const load = (async ({locals}) => {
    if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}
    const formEmail = await superValidate(zod(UserEmailSchema));
    const formUsername = await superValidate(zod(UserEmailSchema));
    return {
        formEmail,
        formUsername
    };
}) satisfies PageServerLoad;

export const actions = {
    updateEmail: async ({ request, locals }) => {
		const formEmail = await superValidate(request, zod(UserEmailSchema));
        if (!formEmail.valid) {
			return message(formEmail, 'Email incorrects', {
				status: 400
			});
		}

		try {
			await locals.pb.collection('users').requestEmailChange(formEmail.data.email);
		} catch (err) {
			console.error('Error: ', err);
			if (err instanceof ClientResponseError) {
				if (err.status === 400) {
					return message(formEmail, 'Email incorrects', {
						status: 400
					});
				}
			}
			error(500, {
				message: "Quelque chose s'est mal passé lors de la connexion. Veuillez réessayer plus tard."
			});
		}

		return {
			formEmail
		};
	},
	updateUsername: async ({ request, locals }) => {
		const formUsername = await superValidate(request, zod(UserUsernameSchema));
        if (!formUsername.valid) {
			return message(formUsername, 'Pseudo incorrects', {
				status: 400
			});
		}
        if(!locals.user){
           return message(formUsername, 'Utilisateur non trouvé',{
                status: 404
           });
        }

		try {
            // Check if the username is already taken
			await locals.pb.collection('users').getFirstListItem(`username = "${formUsername.data.username}"`);
		} catch (err) {
            if (err instanceof ClientResponseError) {
                if (err.status === 404) {
				try {
					const { username } = await locals.pb
						.collection('users')
						.update(locals.user.id, { username: formUsername.data.username });
					locals.user.username = username;
					return {
						formUsername
					};
				} catch (err) {
					console.log('Error: ', err);
                    if(err instanceof ClientResponseError){
					error(err.status, err.message);
                    }
                    error(500, {
                        message: "Quelque chose s'est mal passé lors de la connexion. Veuillez réessayer plus tard."
                    });
				}
			}
			error(err.status, err.message);
		}
        error(500, {
            message: "Quelque chose s'est mal passé lors de la connexion. Veuillez réessayer plus tard."
        });
	}
    return {
        formUsername
    };
}
};