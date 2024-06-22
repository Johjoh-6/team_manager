<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { getImageURL } from '$lib/utils/getImageUrl';
	import { goto } from '$app/navigation';

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
					message: 'Modification éffectuée avec succès',
					background: 'bg-success-500',
					timeout: 3000,
					callback: () => {
						goto('/teams');
					}
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
	<title>Modifier son équipe {data.team?.name}</title>
</svelte:head>

<section class="content-grid content-grid justify-center p-4">
	<div
		class="bg-surface-300-600-token flex w-full flex-col gap-4 p-8 shadow-md rounded-container-token"
	>
	<div class="flex flex-col gap-2 items-center">

		<h1 class="text-3xl font-semibold text-primary-500 text-center">Modifier son équipe</h1>
		<img src={$form.logo && getImageURL(data.collectionId, data.recordId , $form.logo, '100x100')} alt="Logo de l'équipe" class="w-30 h-30 rounded-full" />
	</div>
		<form
			class="form grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4"
			use:enhance
			method="POST"
			enctype="multipart/form-data"
		>
			<label class="label" for="name">
				<span>Nom de l'équipe</span>
				<input
					class="input {$errors.name && 'input-error'}"
					type="text"
					id="name"
					name="name"
					bind:value={$form.name}
				/>
				{#if $errors.name}
					<p class="text-error-500">{$errors.name}</p>
				{/if}
			</label>

			<label class="label md:col-span-2" for="description">
				<span>Description </span><span class="text-token text-xs opacity-85"> (facultatif)</span>
				<textarea
					class="textarea {$errors.description && 'input-error'}"
					rows="4"
					name="description"
					placeholder="Description fr l'équipe."
					bind:value={$form.description}
				/>
				{#if $errors.description}
					<p class="text-error-500">{$errors.description}</p>
				{/if}
			</label>

			<label class="label" for="sport">
				<span>Sport</span>
				<select class="select capitalize" name="sport" id="sport" bind:value={$form.sport}>
					<option value="">Choisir un sport</option>
					{#each data.sportList as sport}
						<option value={sport.id} selected={$form.sport == sport.id}>{sport.name}</option>
					{/each}
				</select>
				{#if $errors.sport}
					<p class="text-error-500">{$errors.sport}</p>
				{/if}
			</label>

			<label class="label" for="logo">
				<span>Logo </span><span class="text-token text-xs opacity-85"> (facultatif)</span>
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
				<span>Contact </span><span class="text-token text-xs opacity-85"> (facultatif)</span>
				<input
					class="input {$errors.contact_info && 'input-error'}"
					type="text"
					id="contact-info"
					name="contact-info"
					bind:value={$form.contact_info}
				/>
				{#if $errors.contact_info}
					<p class="text-error-500">{$errors.contact_info}</p>
				{/if}
			</label>
			<label class="label" for="location">
				<span>Localisation </span><span class="text-token text-xs opacity-85"> (facultatif)</span>
				<input
					class="input {$errors.location && 'input-error'}"
					type="text"
					id="location"
					name="location"
					bind:value={$form.location}
				/>
				{#if $errors.location}
					<p class="text-error-500">{$errors.location}</p>
				{/if}
			</label>

			<button type="submit" class="variant-filled-primary btn mt-2 md:col-span-2">Modifier</button>
		</form>
	</div>
</section>
