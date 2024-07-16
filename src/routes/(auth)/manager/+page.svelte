<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import type { PaginationSettings, ToastSettings } from '@skeletonlabs/skeleton';
	import { Paginator, getToastStore } from '@skeletonlabs/skeleton';

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
		goto(`/manager?page=${page + 1}&perPage=${perPage}`);
	};

	const onAmountChange = async (e: CustomEvent): Promise<void> => {
		page = 1; // reset page to 1 when changing amount
		perPage = e.detail;
		goto(`/manager?page=${page}&perPage=${perPage}`);
	};

	const handleSearch = async (): Promise<void> => {
		goto(`/manager?search=${search}`);
	};
	const handleKeySearch = async (e: KeyboardEvent): Promise<void> => {
		if (e.key === 'Enter') {
			goto(`/manager?search=${search}`);
		}
	};
	const handleReset = async (): Promise<void> => {
		search = '';
		goto(`/manager?search=${search}`);
	};

	let t: ToastSettings;
	$: if (form?.update) {
		t = {
			message: 'Modification éffectuée avec succès',
			background: 'bg-green-500',
			classes: 'text-black'
		};
		toastStore.trigger(t);
		goto('/manager');
	} else if (form?.error) {
		t = {
			message: 'Erreur lors de la modification',
			background: 'bg-error-500',
			classes: 'text-black'
		};
		toastStore.trigger(t);
	}
</script>

<svelte:head>
	<title>Toutes les requetes</title>
</svelte:head>

<section class="content-grid flow">
	<div class="flex flex-col gap-4 p-4 md:flex-row">
		<h1 class="flex-grow text-center text-xl">
			Tous les requetes <strong>({data.totalItems})</strong>
		</h1>
	</div>

	<p>Rechercher une requete</p>
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-token h-5 w-5"
				><path
					d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
				></path></svg
			>
		</div>
		<input type="search" placeholder="requete ..." bind:value={search} on:keydown={handleKeySearch}/>
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

	{#if data.claims && data.claims.length === 0}
		<p class="text-center">Pas de requete</p>
		<button
			class="btn bg-primary-500 font-bold text-white hover:text-token hover:ring-primary-400-500-token hover:bg-transparent"
			on:click={handleReset}>Retour</button
		>
	{:else}
		<div class="grid gap-2 lg:grid-cols-2 xl:grid-cols-3">
			{#each data.claims as claim}
				<CardsBasic
					classCardBody="flow"
					classCardHeader="flex flex-nowrap p-4 items-center"
					classCardFooter="flex flex-nowrap p-4 items-center gap-4 justify-center"
				>
					<svelte:fragment>
						<div class="flex gap-2">
							<p class="text-center font-semibold text-primary-500">Nom du joueur</p>
							{#if claim.expand?.playerID}
								<p class="capitalize">
									{claim.expand?.playerID.last_name}
									{claim.expand?.playerID.first_name}
								</p>
							{:else}
								<p>Non renseigné</p>
							{/if}
						</div>
						<div class="flex flex-col gap-2">
							<p class="font-semibold text-primary-500">Message</p>
							{#if claim.message && claim.message.length != ''}
								<p>{claim.message}</p>
							{:else}
								<p>Pas de contenue</p>
							{/if}
						</div>
						<div class="flex gap-2">
							<p class="text-center font-semibold text-primary-500">Date de réclamation</p>
							<p>{dateFormatFr(claim.created)}</p>
						</div>
						<div class="flex gap-2">
							<p class="text-center font-semibold text-primary-500">Date de mise a jour</p>
							<p>{dateFormatFr(claim.updated)}</p>
						</div>
					</svelte:fragment>
					<svelte:fragment slot="footer">
						<form method="POST" use:enhance class="flex flex-col gap-2">
							<input type="hidden" name="id" value={claim.id} />
							<label for="status" class="text-center">
								<span class="font-semibold text-primary-500">Statut</span>
							</label>
							<select class="select" name="status" id="status" value={claim.status}>
								<option value="pending">En attente</option>
								<option value="approved">Accepter</option>
								<option value="rejected">Rejeter</option>
							</select>
							<button class="btn bg-error-500 text-white">Modifier</button>
						</form>
					</svelte:fragment>
				</CardsBasic>
			{/each}
		</div>
		<Paginator
			{settings}
			labelNext="Page suivante"
			labelPrevious="Page d'avant"
			separatorText="sur"
			amountText="requete"
			on:page={onPageChange}
			on:amount={onAmountChange}
		/>
	{/if}
</section>
