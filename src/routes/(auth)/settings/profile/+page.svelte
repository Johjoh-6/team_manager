<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { goto } from '$app/navigation';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
	const toastStore = getToastStore();

	const { form, errors, enhance, message } = superForm(data.form, {
		resetForm: false,
		applyAction: false,
		onResult({ result }) {
			if (result.status === 200) {
				toastStore.trigger({
					message: 'Information mis à jour avec succès',
					background: 'bg-success-500',
					timeout: 3000
				});
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

<div class="flow bg-surface-300-600-token w-full max-w-md p-4 shadow-md rounded-container-token">
	<h1 class="mb-8 text-center text-4xl font-bold">Profil</h1>
	<form class="grid gap-2 space-y-6" use:enhance method="POST">
		<label class="label" for="first_name">
			<span>Nom :</span>
			<input
				class="input {$errors.last_name && 'input-error'}"
				type="text"
				id="last_name"
				name="last_name"
				bind:value={$form.last_name}
			/>
			{#if $errors.last_name}
				<p class="text-error-500">{$errors.last_name}</p>
			{/if}
		</label>
		<label class="label" for="first_name">
			<span>Prénom :</span>
			<input
				class="input {$errors.first_name && 'input-error'}"
				type="text"
				id="first_name"
				name="first_name"
				bind:value={$form.first_name}
			/>
			{#if $errors.first_name}
				<p class="text-error-500">{$errors.first_name}</p>
			{/if}
		</label>
		<button class="btn bg-primary-500 text-white" type="submit">Mettre à jour</button>
	</form>
</div>
