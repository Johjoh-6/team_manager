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
					message: 'Modification éffectuée avec succès',
					background: 'bg-success-500',
					timeout: 3000,
					callback: () => {
						goto('/history');
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
	<title>Modifier l'historique du match</title>
</svelte:head>

<section class="content-grid content-grid justify-center p-4">
	<div
		class="bg-surface-300-600-token flex w-full flex-col gap-4 p-8 shadow-md rounded-container-token"
	>
		<h1 class="text-center text-3xl font-semibold text-primary-500">
			Modifier l'historique du match
		</h1>
		<form class="form grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4" use:enhance method="POST">
			<label class="label" for="name">
				<span>Nom de l'évenement</span>
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
			<label class="label" for="position">
				<span>Équipe adverse </span><span class="text-token text-xs opacity-85"> (facultatif)</span>
				<select
					class="select capitalize"
					name="position"
					id="position"
					bind:value={$form.team_opponent}
				>
					<option value="">Choisir une équipe</option>
					{#each data.teamList as t}
						<option value={t.id} selected={$form.team_opponent == t.id}>
							{t.name}
						</option>
					{/each}
				</select>
				{#if $errors.team_opponent}
					<p class="text-error-500">{$errors.team_opponent}</p>
				{/if}
			</label>
			<label class="label" for="team_opponent_name">
				<span>Nom de l'équipe adverse</span><span class="text-token text-xs opacity-85">
					(Si non trouver dans la liste)</span
				>
				<input
					class="input {$errors.team_opponent_name && 'input-error'}"
					type="text"
					id="team_opponent_name"
					name="team_opponent_name"
					bind:value={$form.team_opponent_name}
				/>
				{#if $errors.team_opponent_name}
					<p class="text-error-500">{$errors.team_opponent_name}</p>
				{/if}
			</label>
			<label class="label md:col-span-2" for="score">
				<span>Score</span>
				<input
					class="input {$errors.score && 'input-error'}"
					type="number"
					min="0"
					max="200"
					id="score"
					name="score"
					bind:value={$form.score}
				/>
				{#if $errors.score}
					<p class="text-error-500">{$errors.score}</p>
				{/if}
			</label>
			<label class="label md:col-span-2" for="score_opponent">
				<span>Score adverse</span>
				<input
					class="input {$errors.score_opponent && 'input-error'}"
					type="number"
					min="0"
					max="200"
					id="score_opponent"
					name="score_opponent"
					bind:value={$form.score_opponent}
				/>
				{#if $errors.score_opponent}
					<p class="text-error-500">{$errors.score_opponent}</p>
				{/if}
			</label>
			<label class="label md:md:col-span-2">
				<span>Description </span><span class="text-token text-xs opacity-85"> (facultatif)</span>
				<textarea
					class="textarea {$errors.description && 'input-error'}"
					rows="4"
					placeholder="Description."
					id="description"
					name="description"
					bind:value={$form.description}
				/>
				{#if $errors.description}
					<p class="text-error-500">{$errors.description}</p>
				{/if}
			</label>
			<label class="label" for="match_date">
				<span>Date du match</span>
				<input
					class="input {$errors.match_date && 'input-error'}"
					type="date"
					id="match_date"
					name="match_date"
					bind:value={$form.match_date}
					min="1900-01-01"
				/>
				{#if $errors.match_date}
					<p class="text-error-500">{$errors.match_date}</p>
				{/if}
			</label>
			<button type="submit" class="variant-filled-primary btn mt-2 md:col-span-2">Modifier</button>
		</form>
	</div>
</section>
