<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import type { PaginationSettings, ToastSettings } from '@skeletonlabs/skeleton';
	import { Avatar, Paginator, getToastStore } from '@skeletonlabs/skeleton';

	export let data: PageData;
	export let form: ActionData;

	const settings: PaginationSettings = {
		page: data.currentPage,
		limit: data.perPage,
		size: data.totalItems,
		amounts: [5, 10, 20, 50]
	};

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import dateFormatFr from '$lib/utils/dateFormatFr';
	import CardsBasic from '$lib/components/CardsBasic.svelte';
	import { getImageURL } from '$lib/utils/getImageUrl';
	import { enhance } from '$app/forms';

	let page = data.currentPage;
	let perPage = data.perPage;
	let search = '';

	const toastStore = getToastStore();

	onMount(async () => {
		search = '';
	});

	const onPageChange = async (e: CustomEvent): Promise<void> => {
		page = e.detail;
		goto(`/players?page=${page + 1}&perPage=${perPage}`);
	};

	const onAmountChange = async (e: CustomEvent): Promise<void> => {
		page = 1; // reset page to 1 when changing amount
		perPage = e.detail;
		goto(`/players?page=${page}&perPage=${perPage}`);
	};

	const handleSearch = async (): Promise<void> => {
		goto(`/players?search=${search}`);
	};
	const handleKeySearch = async (e: KeyboardEvent): Promise<void> => {
		if (e.key === 'Enter') {
			goto(`/players?search=${search}`);
		}
	};
	const handleReset = async (): Promise<void> => {
		console.log('reset');
		search = '';
		goto(`/players?search=${search}`);
	};

	let t: ToastSettings;
	$: if (form?.deleted) {
		t = {
			message: 'Évenement supprimé',
			background: 'bg-green-500'
		};
		toastStore.trigger(t);
		goto('/players');
	} else if (form?.error) {
		t = {
			message: 'Erreur lors de la suppression',
			background: 'bg-error-500'
		};
		toastStore.trigger(t);
	}
</script>

<svelte:head>
	<title>Toutes les joueurs</title>
</svelte:head>

<section class="content-grid flow">
	<div class="flex flex-col gap-4 p-4 md:flex-row">
		<h1 class="flex-grow text-center text-xl">
			Tous les joueurs <strong>({data.totalItems})</strong>
		</h1>
		{#if data.isManager}
			<a href="/players/new" class="variant-filled-primary btn font-bold"> Créer un joueur </a>
		{/if}
	</div>

	<p>Rechercher un joueurs</p>
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-token h-5 w-5"
				><path
					d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
				></path></svg
			>
		</div>
		<input type="search" placeholder="joueur ..." bind:value={search} />
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

	{#if data.players && data.players.length === 0}
		<p class="text-center">Pas de joueur</p>
		<button
			class="btn bg-primary-500 font-bold text-white hover:text-token hover:ring-primary-400-500-token hover:bg-transparent"
			on:click={handleReset}>Retour</button
		>
	{:else}
		<div class="grid gap-2 lg:grid-cols-2 xl:grid-cols-4">
			{#each data.players as player}
				<CardsBasic
					classCardBody="flow"
					classCardHeader="flex flex-nowrap p-4 items-center"
					classCardFooter="flex flex-nowrap p-4 items-center gap-4 justify-center"
				>
					<svelte:fragment slot="header">
						<Avatar
							src={player.picture != ''
								? getImageURL(player.collectionId, player.id, player.picture, '24x24')
								: '/avatar.jpg'}
							fallback="/avatar.jpg"
							alt="Photos du joueur"
							class="avatar"
						/>
						<h3 class="flex-grow p-2 text-center text-xl font-semibold text-primary-500">
							{player.last_name}
							{player.first_name}
						</h3>
					</svelte:fragment>
					<svelte:fragment>
						<div class="flex gap-2">
							<p class="text-center font-semibold text-primary-500">Poste</p>
							<p class="capitalize">{player.expand?.position.name ?? 'Non renseigné'}</p>
						</div>
						<div class="flex gap-2">
							<p class="text-center font-semibold text-primary-500">Nombre</p>
							<p>{player.player_number}</p>
						</div>
						<div class="flex gap-2">
							<p class="text-center font-semibold text-primary-500">Date de naissance</p>
							{#if player.birth_date}
								<p>{dateFormatFr(player.birth_date)}</p>
							{:else}
								<p>Non renseigné</p>
							{/if}
						</div>
						<div class="grid grid-cols-2 gap-2 p-2 text-center">
							<div class="variant-ghost-primary rounded-container-token">
								<p class="font-semibold text-primary-500">Taille</p>
								<p>{player.height} cm</p>
							</div>
							<div class="variant-ghost-primary rounded-container-token">
								<p class="font-semibold text-primary-500">Poids</p>
								<p>{player.weight} kg</p>
							</div>
						</div>
						<p class="text-center font-semibold text-primary-500">Biographie</p>
						{#if player.biography}
							<p>{player.biography}</p>
						{:else}
							<p>Non renseigné</p>
						{/if}
						<div class="card variant-ghost-secondary grid grid-cols-2 gap-2 p-2 text-center">
							<h4 class="font-lg col-span-2 font-semibold text-primary-500">Handicap</h4>
							<p class="text-primary-500">Point</p>
							<p class="text-primary-500">Description</p>
							<p>{player.handy_point}</p>
							{#if player.handy_comment}
								<p>{player.handy_comment}</p>
							{:else}
								<p>Non renseigné</p>
							{/if}
						</div>
					</svelte:fragment>
					<svelte:fragment slot="footer">
						{#if data.isManager || player.user_link == data.idUser}
							<a href="/players/edit-{player.id}" class="variant-filled-secondary btn font-bold"
								>Modifier</a
							>
						{/if}
						{#if data.isManager}
							<form method="POST" use:enhance>
								<input type="hidden" name="id" value={player.id} />
								<button class="btn bg-error-500 text-white">Supprimer</button>
							</form>
						{/if}
					</svelte:fragment>
				</CardsBasic>
			{/each}
		</div>
		<Paginator
			{settings}
			labelNext="Page suivante"
			labelPrevious="Page d'avant"
			separatorText="sur"
			amountText="joueurs"
			on:page={onPageChange}
			on:amount={onAmountChange}
		/>
	{/if}
</section>
