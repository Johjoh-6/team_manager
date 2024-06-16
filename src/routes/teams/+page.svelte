<script lang="ts">
	import { getImageURL } from '$lib/utils/getImageUrl';
    import type { PageData } from './$types';
    import { Accordion, AccordionItem, Avatar, type PaginationSettings } from '@skeletonlabs/skeleton';
    import { Paginator } from '@skeletonlabs/skeleton';
    
    export let data: PageData;

    const settings: PaginationSettings = {
       page: data.currentPage,
       limit: data.perPage,
       size: data.totalItems,
       amounts: [5, 10, 20, 50],
         
    }


    import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

    let page = data.currentPage;
    let perPage = data.perPage;
    let search = '';

    onMount(async() => {
        search = '';
    });

const onPageChange = async(e: CustomEvent): Promise<void> =>{
    page = e.detail;
  goto(`/teams?page=${page}&perPage=${perPage}`);
}

const onAmountChange = async(e: CustomEvent): Promise<void> =>{
  page = 1; // reset page to 1 when changing amount
  perPage = e.detail;
  goto(`/teams?page=${page}&perPage=${perPage}`);
}

const handleSearch = async(): Promise<void> =>{
    goto(`/teams?search=${search}`);
}
const handleReset = async(): Promise<void> =>{
    console.log('reset');
    search = '';
    goto(`/teams?search=${search}`);
}
</script>

<svelte:head>
    <title>Toutes les équipes</title>
</svelte:head>

<section class="content-grid flow">
    <h1 class="text-xl p-2 text-center">Toutes les équipes <strong>({data.totalItems})</strong></h1>
    
    <p>Trouver son équipe</p>
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-token w-5 h-5"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg></div>
        <input type="search" placeholder="équipe ..." bind:value={search} />
        <button class="variant-filled-secondary hover:variant-ghost-secondary" on:click={handleSearch}>Trouver</button>
        </div>
		
        {#if data.teams.length === 0}
            <p class="text-center">Pas d'équipes</p>
            <button class="btn bg-primary-500 font-bold text-white hover:text-token hover:ring-primary-400-500-token hover:bg-transparent" on:click={handleReset}>Retour</button>
        {:else}
    <Accordion autocollapse>
        {#each data.teams as team}
            <AccordionItem >
                <svelte:fragment slot="lead">
                    <!-- add logo team handy -->
                    <Avatar width='w-12 md:w-16' src={team.logo != '' ? getImageURL(team.collectionId, team.id, team.logo, '24x24') : ''} alt={team.name} />
                </svelte:fragment>
                <svelte:fragment slot="summary">
                    <p class="text-lg font-semibold text-primary-500">{team.name}</p>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="flex flex-col gap-1">
                        {#if team.description}
                            <p>{team.description}</p>
                        {:else}
                            <p>Pas de description</p>
                        {/if}
                        <p class="capitalize">{team.sport_name ?? 'Non renseingé'}</p>
                        <p>Nombre de joueurs : <strong>{team.player_nb}</strong></p>
                        <p>Manager <span class="uppercase">{team.manager_last}</span> {team.manager_first}</p>
                        {#if !data.team}
                        <button class="btn bg-primary-500 font-bold text-white hover:text-token hover:ring-primary-400-500-token hover:bg-transparent" on:click={()=> {
                            console.log('join team', team.id);
                        }}>Rejoindre</button>
                        {/if}
                    </div>
                </svelte:fragment>
            </AccordionItem>
        {/each}
    </Accordion>
    <Paginator settings={settings} labelNext="Page suivante" labelPrevious="Page d'avant" separatorText="sur" amountText="équipes" on:page={onPageChange} on:amount={onAmountChange}/>
    {/if}
</section>