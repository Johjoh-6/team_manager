<script lang="ts">
	import type { PageData } from './$types';
	import type { PaginationSettings } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const settings: PaginationSettings = {
		page: data.currentPage,
		limit: data.perPage,
		size: data.totalItems,
		amounts: [5, 10, 20, 50]
	};

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import dateFormatFr from '$lib/utils/dateFormatFr';

	let page = data.currentPage;
	let perPage = data.perPage;
	let search = '';

	onMount(async () => {
		search = '';
	});

	const onPageChange = async (e: CustomEvent): Promise<void> => {
		page = e.detail;
		goto(`/calendar?page=${page + 1}&perPage=${perPage}`);
	};

	const onAmountChange = async (e: CustomEvent): Promise<void> => {
		page = 1; // reset page to 1 when changing amount
		perPage = e.detail;
		goto(`/calendar?page=${page}&perPage=${perPage}`);
	};

	const handleSearch = async (): Promise<void> => {
		goto(`/calendar?search=${search}`);
	};
	const handleKeySearch = async (e: KeyboardEvent): Promise<void> => {
		if (e.key === 'Enter') {
			goto(`/calendar?search=${search}`);
		}
	};
	const handleReset = async (): Promise<void> => {
		search = '';
		goto(`/calendar?search=${search}`);
	};
</script>

<svelte:head>
	<title>Toutes les évenements</title>
</svelte:head>

<section class="content-grid flow">
	<div class="flex flex-col gap-4 p-4 md:flex-row">
		<h1 class="flex-grow text-center text-xl">
			Tous les évenements <strong>({data.totalItems})</strong>
		</h1>
		{#if data.isManager}
			<a href="/calendar/new" class="variant-filled-primary btn font-bold"> Créer un évenement </a>
		{/if}
	</div>

	<p>Rechercher un évenement</p>
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-token h-5 w-5"
				><path
					d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
				></path></svg
			>
		</div>
		<input type="search" placeholder="événement ..." bind:value={search} on:keydown={handleKeySearch}/>
		<button
			class="variant-filled-secondary hover:variant-ghost-secondary"
			on:click={handleSearch}
			on:keydown={handleKeySearch}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="h-5 w-5 fill-white md:hidden"
				><path
					d="M3 12.9999H9V10.9999H3V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V12.9999Z"
				></path></svg
			>
			<span class="hidden md:block"> Trouver </span>
		</button>
	</div>

	{#if data.events.length === 0}
		<p class="text-center">Pas d'évenements</p>
		<button
			class="btn bg-primary-500 font-bold text-white hover:text-token hover:ring-primary-400-500-token hover:bg-transparent"
			on:click={handleReset}>Retour</button
		>
	{:else}
		<div class="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
			{#each data.events as event}
				<a href="/calendar/{event.id}" class="card card-hover flex flex-col gap-2 p-2">
					<p class=" text-center text-lg capitalize">
						{event.name ?? 'Non renseigné'}
					</p>
					<span class="badge bg-primary-500 p-2 text-white"
						>{event?.expand?.type.name ?? 'Non défini'}</span
					>
					<p class="content-center text-nowrap text-center">
						{dateFormatFr(event.date_start)} / {dateFormatFr(event.date_end)}
					</p>
				</a>
			{/each}
		</div>
		<Paginator
			{settings}
			labelNext="Page suivante"
			labelPrevious="Page d'avant"
			separatorText="sur"
			amountText="évenements"
			on:page={onPageChange}
			on:amount={onAmountChange}
		/>
	{/if}
</section>
