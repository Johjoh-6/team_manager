<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const toastStore = getToastStore();

	// Client API:
	const { form, errors, enhance, message } = superForm(data.form, {
		resetForm: false,
		applyAction: false,
		onResult({ result }) {
			if (result.status === 200) {
				const t: ToastSettings = {
					message: 'Modification avec succès',
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
	<title>Modifier l'événement {data.event.name}</title>
</svelte:head>

<section class="content-grid content-grid justify-center p-4">
	<div
		class="bg-surface-300-600-token flex w-full flex-col gap-4 p-8 shadow-md rounded-container-token"
	>
		<h1 class="text-center text-3xl font-semibold text-primary-500">Modifier l'évenement</h1>
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
			<label class="label" for="type">
				<span>Type d'évenement</span>
				<select class="select capitalize" name="type" id="type" bind:value={$form.type}>
					<option value="">Choisir un type d'évenement</option>
					{#each data.eventType as t}
						<option value={t.id} selected={$form.type == t.id}>
							{t.name}
						</option>
					{/each}
				</select>
				{#if $errors.type}
					<p class="text-error-500">{$errors.type}</p>
				{/if}
			</label>

			<label class="label col-span-2" for="location">
				<span>Location</span>
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
			<label class="label" for="date-start">
				<span>Date de début</span>
				<input
					class="input {$errors.date_start && 'input-error'}"
					type="datetime-local"
					id="date-start"
					name="date_start"
					bind:value={$form.date_start}
				/>
				{#if $errors.date_start}
					<p class="text-error-500">{$errors.date_start}</p>
				{/if}
			</label>

			<label class="label" for="date-end">
				<span>Date de fin</span>
				<input
					class="input {$errors.date_end && 'input-error'}"
					type="datetime-local"
					id="date-end"
					name="date_end"
					bind:value={$form.date_end}
				/>
				{#if $errors.date_end}
					<p class="text-error-500">{$errors.date_end}</p>
				{/if}
			</label>

			<label class="label md:col-span-2">
				<span>Notes </span><span class="text-token text-xs opacity-85"> (facultatif)</span>
				<textarea
					class="textarea {$errors.note && 'input-error'}"
					rows="4"
					placeholder="Notes sur l'évenement."
					id="note"
					name="note"
					bind:value={$form.note}
				/>
				{#if $errors.note}
					<p class="text-error-500">{$errors.note}</p>
				{/if}
			</label>

			<button type="submit" class="variant-filled-primary btn mt-2 md:col-span-2"
				>Enregistrer</button
			>
		</form>
	</div>
</section>
