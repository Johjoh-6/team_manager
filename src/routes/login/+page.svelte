<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import Password from '$lib/components/Password.svelte';
	import { goto } from '$app/navigation';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;
	const toastStore = getToastStore();

	// Client API:
	const { form, errors, enhance, message } = superForm(data.form, {
		resetForm: false,
		applyAction: false,
		onResult({ result }) {
			console.log(result);
			if (result.status === 200) {
				const t: ToastSettings = {
					message: 'Connexion réussie',
					background: 'bg-success-500',
					timeout: 3000
				};
				toastStore.trigger(t);

				return;
			}
		}
	});

	$: if ($message) {
		const t: ToastSettings = {
			message: $message,
			background: 'bg-error-500',
			timeout: 3000
		};
		toastStore.trigger(t);
	}
</script>

<svelte:head>
	<title>Se connecter Handy Team</title>
</svelte:head>

<section id="login-form" class="content-grid h-full place-items-center">
	<div class="bg-surface-300-600-token w-full max-w-md p-8 shadow-md rounded-container-token">
		<h1 class="mb-8 text-center text-4xl font-bold">Connexion</h1>
		<form class="space-y-6" use:enhance action="?/login" method="POST">
			<div>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="ml-2 block text-sm font-medium">E-mail</label>
				<input
					class="mt-1 block w-full border border-gray-300 px-3 py-2 shadow-sm rounded-token focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					type="email"
					name="email"
					placeholder="Example: myteam@gmail.com"
					aria-invalid={$errors.email ? 'true' : undefined}
					bind:value={$form.email}
				/>
				{#if $errors.email}
					<p class="mt-2 text-sm text-error-500">{$errors.email}</p>
				{/if}
			</div>
			<div>
				<Password
					classLabel="block text-sm font-medium  ml-2"
					classInput="mt-1 block w-full border border-gray-300 rounded-token shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					bind:value={$form.password}
					error={$errors.password}
				/>

				<!-- <button
					class="mt-2 ml-1 text-sm text-indigo-600 hover:text-indigo-500"
					tabindex="-1"
					formaction="?/forgot">Mots de passe oublié ?</button
				> -->
			</div>
			<div class="flex w-full flex-nowrap justify-between gap-2">
				<!-- two button -->
				<button
					class="btn-lg variant-gradient-primary-secondary w-full text-nowrap bg-gradient-to-br rounded-token hover:bg-primary-active-token"
					type="submit"
					tabindex="0"
				>
					Se connecter
				</button>
				<button
					class="btn-lg variant-gradient-secondary-primary w-full text-nowrap bg-gradient-to-br rounded-token hover:bg-secondary-active-token"
					type="button"
					tabindex="0"
					on:click={() => {
						// Redirect to the register page
						goto('/register');
					}}
				>
					S'enregistrer
				</button>
			</div>
		</form>
	</div>
</section>
