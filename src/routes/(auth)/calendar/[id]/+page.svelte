<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	import type { ActionData, PageData } from './$types';
	import dateFormatFr from '$lib/utils/dateFormatFr';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;
	export let form: ActionData;
	const event = data.event as RecordModel;
	const toastStore = getToastStore();

	const dayBeforeEvent = (date: string) => {
		const eventDate = new Date(date);
		const today = new Date();
		const diffTime = eventDate.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	let t: ToastSettings;
	$: if (form?.deleted) {
		t = {
			message: 'Évenement supprimé',
			background: 'bg-green-500',
			classes: 'text-black',
		};
		toastStore.trigger(t);
		goto('/calendar');
	} else if (form?.error) {
		t = {
			message: 'Erreur lors de la suppression',
			background: 'bg-error-500',
			classes: 'text-black',
		};
		toastStore.trigger(t);
	}
</script>

<svelte:head>
	<title>Événement {event.name}</title>
</svelte:head>

<section class="content-grid mt-4">
	<div class="event card grid select-none grid-cols-2 gap-4 p-4">
		<h2 class=" text-center text-xl capitalize text-primary-500">{event.name}</h2>
		<span class="badge bg-primary-500 p-2 text-white"
			>{event?.expand?.type.name ?? 'Non défini'}</span
		>
		<p class="t-start text-center font-semibold text-primary-500">Début</p>
		<p class="start text-center">{dateFormatFr(event.date_start)}</p>
		<p class="t-end text-center font-semibold text-primary-500">Fin</p>
		<p class="end text-center">{dateFormatFr(event.date_end)}</p>
		<p class="diff text-center">
			Évenement dans <strong class="text-primary-500">{dayBeforeEvent(event.date_start)}</strong> jour(s)
		</p>
		<p class="location">Location : <span class="capitalize">{event.location}</span></p>
		<div class="notes">
			<h3 class="text-lg font-semibold">Notes</h3>
			<div class="card bg-surface-200-700-token p-2">
				{#if event.note}
					<p>{event.note}</p>
				{:else}
					<p>Pas de note</p>
				{/if}
			</div>
		</div>
		{#if data.isManager}
			<div class="actions">
				<button
					class="btn bg-secondary-500 text-white"
					on:click={() => {
						goto(`/calendar/${event.id}/edit`);
					}}>Modifier</button
				>
				<form method="POST" use:enhance>
					<button class="btn bg-error-500 text-white">Supprimer</button>
				</form>
			</div>
		{/if}
	</div>
</section>

<style lang="postcss">
	.event {
		grid-template-areas:
			'title title'
			'badge .'
			't-start t-end'
			'start end'
			'diff diff'
			'location location'
			'notes notes'
			'actions actions';
	}
	.event h2 {
		grid-area: title;
	}
	.event span {
		grid-area: badge;
	}
	.t-start {
		grid-area: t-start;
	}
	.t-end {
		grid-area: t-end;
	}
	.start {
		grid-area: start;
	}
	.end {
		grid-area: end;
	}
	.diff {
		grid-area: diff;
	}
	.location {
		grid-area: location;
	}
	.notes {
		grid-area: notes;
	}
	.notes h3 {
		margin-bottom: 0.5rem;
	}
	.actions {
		grid-area: actions;
		@apply flex flex-auto justify-center gap-2;
	}
</style>
