<script lang="ts">
	import { getImageURL } from '$lib/utils/getImageUrl';
	import type { PageData } from './$types';
	import {
		Accordion,
		AccordionItem,
		Avatar,
		type PaginationSettings
	} from '@skeletonlabs/skeleton';
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
		goto(`/history?page=${page+1}&perPage=${perPage}`);
	};

	const onAmountChange = async (e: CustomEvent): Promise<void> => {
		page = 1; // reset page to 1 when changing amount
		perPage = e.detail;
		goto(`/history?page=${page}&perPage=${perPage}`);
	};

	const handleSearch = async (): Promise<void> => {
		goto(`/history?search=${search}`);
	};
	const handleKeySearch = async (e: KeyboardEvent): Promise<void> => {
		if (e.key === 'Enter') {
			goto(`/history?search=${search}`);
		}
	};
	const handleReset = async (): Promise<void> => {
		console.log('reset');
		search = '';
		goto(`/history?search=${search}`);
	};
	console.log(data);
</script>

<svelte:head>
	<title>Les résultats des matchs</title>
</svelte:head>

<section class="content-grid flow">
	<h1 class="p-2 text-center text-xl">Les résultats des matchs</h1>

	<p>Trouver un réseultat de match</p>
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-token h-5 w-5"
				><path
					d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
				></path></svg
			>
		</div>
		<input type="search" placeholder="match ..." bind:value={search} />
		<button
			class="variant-filled-secondary hover:variant-ghost-secondary"
			on:click={handleSearch}
			on:keydown={handleKeySearch}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-white h-5 w-5 md:hidden"><path d="M3 12.9999H9V10.9999H3V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V12.9999Z"></path></svg>
			<span class="hidden md:block">
				Trouver
			</span>
			</button
		>
	</div>

	{#if data.histories.length === 0}
		<p class="text-center">Pas de matchs</p>
		<button
			class="btn bg-primary-500 font-bold text-white hover:text-token hover:ring-primary-400-500-token hover:bg-transparent"
			on:click={handleReset}>Retour</button
		>
	{:else}
		<Accordion>
			{#each data.histories as history}
				<AccordionItem>
					<svelte:fragment slot="summary">
						<div class="flex gap-2 p-2 items-center">
						<Avatar
							width="w-12 md:w-16"
							src={history.expand.team.logo != ''
								? getImageURL(history.expand.team.collectionId, history.expand.team.id, history.expand.team.logo, '24x24')
								: ''}
							alt={history.expand.team.name}
							/>
							
							<span class="text-secondary-500 font-semibold text-xl"> VS </span>
							{#if history.expand.team_opponent}
							<Avatar
							width="w-12 md:w-16"
							src={history.expand.team_opponent.logo != ''
									? getImageURL(history.expand.team.collectionId, history.expand.team_opponent.id, history.expand.team_opponent.logo, '24x24')
									: ''}
								alt={history.expand.team_opponent.name}
								/>
								{:else}
								<Avatar
								width="w-12 md:w-16"
								initials={history.team_opponent_name}
								alt={history.team_opponent_name}
								/>
								{/if}
								{history.name}
							</div>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="flex flex-col gap-1 text-center">
							<p>{history.score} <strong>/</strong> {history.score_opponent}</p>
							<p>{history.expand.team.name} <strong>/</strong> {history.expand.team_opponent ? history.expand.team_opponent.name : history.expand.team_opponent_name}</p>
							<p>{dateFormatFr(history.match_date)}</p>
							<p>{history.expand.team.sport.name}</p>
							{#if history.description}
							<p>{history.description}</p>
							{/if}
							{#if history.team === data.team.id && data.isManager}
								<a href="/history/edit-{history.id}" class="btn variant-ghost-primary">Modifier le match</a>
							{/if}
						</div>
					</svelte:fragment>
				</AccordionItem>
			{/each}
		</Accordion>
		<Paginator
			{settings}
			labelNext="Page suivante"
			labelPrevious="Page d'avant"
			separatorText="sur"
			amountText="équipes"
			on:page={onPageChange}
			on:amount={onAmountChange}
		/>
	{/if}
</section>
