<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const toastStore = getToastStore();

	// Client API:
	const { form, errors, enhance, message } = superForm(data.form, {
		resetForm: false,
		applyAction: false,
		onResult({ result }) {
			if (result.status === 200) {
				const t: ToastSettings = {
					message: 'Création avec succès',
					background: 'bg-success-500',
					timeout: 3000,
					callback: () => {
						goto('/players');
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
	<title>Crée un Joueur</title>
</svelte:head>

<section class="content-grid content-grid justify-center p-4">
	<div
		class="bg-surface-300-600-token flex w-full flex-col gap-4 p-8 shadow-md rounded-container-token"
	>
		<h1 class="text-center text-3xl font-semibold text-primary-500">Crée un nouveau joueur</h1>
		<form
			class="form grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4"
			use:enhance
			method="POST"
			enctype="multipart/form-data"
		>
			<label class="label" for="first_name">
				<span>Prénom</span>
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
			<label class="label" for="last_name">
				<span>Nom</span>
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
			<label class="label" for="picture">
				<span>Photo du joueur </span><span class="text-token text-xs opacity-85">
					(facultatif)</span
				>
				<input
					type="file"
					id="picture"
					name="picture"
					bind:value={$form.picture}
					class="input"
					placeholder="Choisir un photo."
				/>
				{#if $errors.picture}
					<p class="text-error-500">{$errors.picture}</p>
				{/if}
			</label>
			<label class="label" for="position">
				<span>Position dans l'équipe</span>
				<select class="select capitalize" name="position" id="position" bind:value={$form.position}>
					<option value="">Choisir une position</option>
					{#each data.positionList as t}
						<option value={t.id} selected={$form.position == t.id}>
							{t.name}
						</option>
					{/each}
				</select>
				{#if $errors.position}
					<p class="text-error-500">{$errors.position}</p>
				{/if}
			</label>
			<label class="label md:col-span-2" for="player_number">
				<span>Numéro du joueur</span>
				<input
					class="input {$errors.player_number && 'input-error'}"
					type="number"
					min="0"
					max="300"
					id="player_number"
					name="player_number"
					bind:value={$form.player_number}
				/>
				{#if $errors.player_number}
					<p class="text-error-500">{$errors.player_number}</p>
				{/if}
			</label>
			<label class="label md:col-span-2">
				<span>Biographie </span><span class="text-token text-xs opacity-85"> (facultatif)</span>
				<textarea
					class="textarea {$errors.biography && 'input-error'}"
					rows="4"
					placeholder="Biographie."
					id="biography"
					name="biography"
					bind:value={$form.biography}
				/>
				{#if $errors.biography}
					<p class="text-error-500">{$errors.biography}</p>
				{/if}
			</label>
			<label class="label md:col-span-2" for="handy_point">
				<span>handy_point</span>
				<input
					class="input {$errors.handy_point && 'input-error'}"
					type="number"
					min="-100"
					max="100"
					id="handy_point"
					name="handy_point"
					bind:value={$form.handy_point}
				/>
				{#if $errors.handy_point}
					<p class="text-error-500">{$errors.handy_point}</p>
				{/if}
			</label>
			<label class="label md:col-span-2">
				<span>Commentaire sur l'handicap </span><span class="text-token text-xs opacity-85">
					(facultatif)</span
				>
				<textarea
					class="textarea {$errors.handy_comment && 'input-error'}"
					rows="4"
					placeholder="Biographie."
					id="handy_comment"
					name="handy_comment"
					bind:value={$form.handy_comment}
				/>
				{#if $errors.handy_comment}
					<p class="text-error-500">{$errors.handy_comment}</p>
				{/if}
			</label>
			<label class="label md:col-span-2" for="height">
				<span>Taille</span>
				<input
					class="input {$errors.height && 'input-error'}"
					type="number"
					min="0"
					max="300"
					id="height"
					name="height"
					bind:value={$form.height}
				/>
				{#if $errors.height}
					<p class="text-error-500">{$errors.height}</p>
				{/if}
			</label>
			<label class="label md:col-span-2" for="weight">
				<span>Poids</span>
				<input
					class="input {$errors.weight && 'input-error'}"
					type="number"
					min="0"
					max="300"
					id="weight"
					name="weight"
					bind:value={$form.weight}
				/>
				{#if $errors.weight}
					<p class="text-error-500">{$errors.weight}</p>
				{/if}
			</label>
			<label class="label" for="bod">
				<span>Date de naissance</span>
				<input
					class="input {$errors.bod && 'input-error'}"
					type="date"
					id="bod"
					name="bod"
					min="1900-01-01"
					bind:value={$form.bod}
				/>
				{#if $errors.bod}
					<p class="text-error-500">{$errors.bod}</p>
				{/if}
			</label>
			<button type="submit" class="variant-filled-primary btn mt-2 md:col-span-2">Créer</button>
		</form>
	</div>
</section>
