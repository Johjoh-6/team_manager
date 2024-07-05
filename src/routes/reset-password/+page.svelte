<script lang="ts">
    import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { goto } from '$app/navigation';
    
    export let data: PageData;
    
    const toastStore = getToastStore();
    
    const { form, errors, enhance, message } = superForm(data.form, {
		resetForm: false,
		onResult({ result }) {
			if (result.status === 200) {
				const t: ToastSettings = {
					message: 'Un email a été envoyé pour la réinitialisation du mots de passe',
					background: 'bg-success-500',
					classes: 'text-black',
					timeout: 5000,
					callback: (response) => {
						if (response.status === 'closed') goto('/login');
					}
				};
				toastStore.trigger(t);
			}
		}
	});

	$: if ($message) {
		const t: ToastSettings = {
			message: 'Erreur lors de la réinitialisation du mots de passe',
			background: 'bg-error-500',
			classes: 'text-black',
			timeout: 3000
		};
		toastStore.trigger(t);
	}



</script>

<svelte:head>
	<title>Réinitialiser son mots de passe</title>
</svelte:head>

<section class="content-grid flow">
	<div class="bg-gradient-to-br variant-gradient-primary-secondary full-width flex flex-col gap-2 p-4">
        <h1 class="text-center text-xl font-semibold">
            Réinitialiser son mots de passe
        </h1>
        <p class="text-leg text-center">
            Vous êtes sur le point de réinitialiser votre mots de passe. Veuillez saisir votre adresse email.
        </p>
    </div>
    <div class="card flex flex-col gap-2 p-4">
        <h2 class="text-center text-lg font-semibold text-primary-500">Saisir votre adresse email</h2>
        <form method="POST" use:enhance class="flex flex-col gap-2">
			<label for="email" class="ml-2 block text-sm font-medium">E-mail</label>
				<input
					class="mt-1 block w-full border border-gray-300 px-3 py-2 shadow-sm rounded-token focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black"
					type="email"
					name="email"
					placeholder="Example: myteam@gmail.com"
					aria-invalid={$errors.email ? 'true' : undefined}
					bind:value={$form.email}
				/>
				{#if $errors.email}
					<p class="mt-2 text-sm text-error-500">{$errors.email}</p>
				{/if}
            <button class="btn btn-primary" type="submit">Réinitialiser</button>
        </form>
    </div>
</section>
