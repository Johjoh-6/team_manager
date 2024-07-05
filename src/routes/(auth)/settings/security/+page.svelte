<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { goto } from '$app/navigation';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Password from '$lib/components/Password.svelte';

	export let data: PageData;
	const toastStore = getToastStore();

	const { form, errors, enhance, message } = superForm(data.form, {
		resetForm: false,
		applyAction: false,
		onResult({ result }) {
			if (result.status === 200) {
				toastStore.trigger({
					message: 'Mots de passe modifié avec succès',
					background: 'bg-success-500',
					timeout: 3000
				});
				goto('/login');
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

<div class="flow bg-surface-300-600-token w-full max-w-md p-8 shadow-md rounded-container-token">
	<h1 class="mb-8 text-center text-4xl font-bold">Sécurité</h1>
	<form class="grid gap-2 space-y-6" use:enhance method="POST">
		<Password
			classLabel="block text-semivold"
			classInput="mt-1 block w-full border border-gray-300 rounded-token shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			bind:value={$form.oldPassword}
			error={$errors.oldPassword}
			textLabel="Ancien mots de passe"
			name="oldPassword"
		/>
		<Password
			textLabel="Nouveau mots de passe"
			classLabel="block text-semivold"
			classInput="mt-1 block w-full border border-gray-300 rounded-token shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			bind:value={$form.password}
			error={$errors.password}
			name="password"
		/>
		<Password
			textLabel="Confirmation mots de passe"
			classLabel="block text-semivold"
			classInput="mt-1 block w-full border border-gray-300 rounded-token shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			bind:value={$form.passwordConfirm}
			error={$errors.passwordConfirm}
			name="passwordConfirm"
		/>
		<a href="/reset-password" class="hover:cursor-point text-primary-500 hover:underline">
			Mots de passe oublié</a
		>
		<button class="btn bg-primary-500 text-white" type="submit"
			>Mettre à jour le mots de passe</button
		>
	</form>
</div>
