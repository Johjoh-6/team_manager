<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
	const toastStore = getToastStore();

	const {
		form: formEmail,
		errors: errorsEmail,
		enhance: enhanceEmail
	} = superForm(data.formEmail, {
		resetForm: false,
		applyAction: false,
		onResult({ result }) {
			if (result.status === 200) {
				toastStore.trigger({
					message: 'Email mis à jour avec succès',
					background: 'bg-success-500',
					timeout: 3000
				});
			} else if (result.status === 400) {
				toastStore.trigger({
					message: `Erreur lors de la mise à jour de l\'email. Email déjà utilisé ou invalide`,
					background: 'bg-error-500',
					timeout: 3000
				});
			}
		}
	});

	const {
		form: formUsername,
		errors: errorsUsername,
		enhance: enhanceUsername
	} = superForm(data.formUsername, {
		resetForm: false,
		applyAction: false,
		onResult({ result }) {
			if (result.status === 200) {
				toastStore.trigger({
					message: 'Pseudo mis à jour avec succès',
					background: 'bg-success-500',
					timeout: 3000
				});
			} else if (result.status === 400) {
				toastStore.trigger({
					message: 'Erreur lors de la mise à jour du pseudo. Pseudo déjà utilisé ou invalide',
					background: 'bg-error-500',
					timeout: 3000
				});
			}
		}
	});
</script>

<div class="flow bg-surface-300-600-token w-full max-w-md p-8 shadow-md rounded-container-token">
	<h1 class="mb-8 text-center text-4xl font-bold">Donné public</h1>
	<form class="grid gap-2 space-y-6" use:enhanceEmail action="?/updateEmail" method="POST">
		<label class="label" for="email">
			<span>Email</span>
			<input
				class="input {$errorsEmail.email && 'input-error'}"
				type="text"
				id="email"
				name="email"
				bind:value={$formEmail.email}
			/>
			{#if $errorsEmail.email}
				<p class="text-error-500">{$errorsEmail.email}</p>
			{/if}
		</label>
		<button class="btn bg-primary-500 text-white" type="submit">Mettre à jour</button>
	</form>
	<form class="grid gap-2 space-y-6" use:enhanceUsername action="?/updateUsername" method="POST">
		<label class="label" for="email">
			<span>Email</span>
			<input
				class="input {$errorsUsername.username && 'input-error'}"
				type="text"
				id="username"
				name="username"
				bind:value={$formUsername.username}
			/>
			{#if $errorsUsername.username}
				<p class="text-error-500">{$errorsUsername.username}</p>
			{/if}
		</label>
		<button class="btn bg-primary-500 text-white" type="submit">Mettre à jour</button>
	</form>
</div>
