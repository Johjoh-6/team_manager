<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
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
					message: 'Ajout réussi',
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
	<title>Créer son équipe</title>
</svelte:head>

<section class="content-grid justify-center content-grid p-4">
	<div class="bg-surface-300-600-token w-full p-8 shadow-md rounded-container-token flex flex-col gap-4">
	<h1 class="text-3xl font-semibold text-primary-500">Créer une équipe</h1>
	<form class="form grid gap-2 grid-cols-1 md:grid-cols-2 md:gap-4" use:enhance method="POST" enctype="multipart/form-data" >
		<label class="label" for="name">
			<span>Nom de l'équipe</span>
			<input class="input {$errors.name && 'input-error'}" type="text" id="name" name="name" bind:value={$form.name} />
			{#if $errors.name}
				<p class="text-error-500">{$errors.name}</p>
			{/if}
		</label>

		<label class="label md:col-span-2">
			<span>Description </span><span class="text-xs text-token opacity-85"> (facultatif)</span>
			<textarea class="textarea {$errors.description && 'input-error'}" rows="4" placeholder="Description fr l'équipe." />
			{#if $errors.description}
				<p class="text-error-500">{$errors.description}</p>
			{/if}
		</label>

		<label class="label" for="sport">
			<span>Sport</span>
			<select class="select capitalize" name="sport" id="sport">
				<option value="">Choisir un sport</option>
				{#each data.sportList as sport}
					<option value={sport.id}>{sport.name}</option>
				{/each}
			</select>
			{#if $errors.sport}
				<p class="text-error-500">{$errors.sport}</p>
			{/if}
		</label>

		<label class="label" for="logo">
			<span>Logo </span><span class="text-xs text-token opacity-85"> (facultatif)</span>
			<input
				type="file"
				id="logo"
				name="logo"
				bind:value={$form.logo}
				class="input"
				placeholder="Choisir un logo"
			/>
			{#if $errors.logo}
				<p class="text-error-500">{$errors.logo}</p>
			{/if}
		</label>

		<label class="label" for="contact-info">
			<span>Contact </span><span class="text-xs text-token opacity-85"> (facultatif)</span>
			<input class="input {$errors.contact_info && 'input-error'}" type="text" id="contact-info" name="contact-info" bind:value={$form.contact_info} />
			{#if $errors.contact_info}
				<p class="text-error-500">{$errors.contact_info}</p>
			{/if}
		</label>
		<label class="label" for="location">
			<span>Localisation </span><span class="text-xs text-token opacity-85"> (facultatif)</span>
			<input class="input {$errors.location && 'input-error'}" type="text" id="location" name="location" bind:value={$form.location} />
			{#if $errors.location}
				<p class="text-error-500">{$errors.location}</p>
			{/if}
		</label>

		<button type="submit" class="btn variant-filled-primary md:col-span-2 mt-2">Créer</button>
	</form>
</div>
</section>
