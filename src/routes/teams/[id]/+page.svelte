<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	import type { PageData } from './$types';
	import { getImageURL } from '$lib/utils/getImageUrl';
	import CardsBasic from '$lib/components/CardsBasic.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data: PageData;
	const team: RecordModel = data.teamId;
	const managerName = `${team?.expand?.manager?.last_name} ${team?.expand?.manager?.first_name}`;
</script>

<svelte:head>
	<title>Teams {team.name}</title>
</svelte:head>

<section class="content-grid flow mt-4">
	<CardsBasic >
		<h1 slot="header"  class="text-xl p-2 text-center text-primary-500 font-semibold">{team.name}</h1>
		{#if team.logo}
			<img
				src={getImageURL(team.collectionId, team.id, team.logo, '24x24')}
				alt="Logo de l'équipe"
				class="logo logo-shadow dark:logo-shadow mx-auto h-24 w-24"
			/>
		{:else}
			<p class="text-center text-lg">Pas de logo</p>
		{/if}
		{#if team?.expand?.sport}
			<p class="text-center text-lg capitalize">{team.expand.sport.name}</p>
		{:else}
			<p class="text-center text-lg">Pas de sport défini</p>
		{/if}
	</CardsBasic>
	<CardsBasic>
		<h2 slot="header" class="text-primary-500 font-semibold text-center text-lg">Team info</h2>
		<div class="grid md:grid-cols-2 gap-2">
			<p class="font-semibold text-primary-500 text-center">Localisation</p>
			<p class="capitalize">{team.location}</p>
			<p class="font-semibold text-primary-500 text-center">Description</p>
			<p>{team.description}</p>
			<p class="font-semibold text-primary-500 text-center">Contact</p>
			<p>{team.contact_info}</p>
			<p class="font-semibold text-primary-500 text-center">Manager</p>
			<p class="capitalize text-center">{managerName !== '' ? managerName : 'Non renseigné'}</p>
		</div>
	</CardsBasic>
	{#if team?.expand?.players}
	<CardsBasic urlToGo="/players">
		<h2 slot="header" class="text-primary-500 font-semibold text-center text-lg">Nombre de joueurs<span>({team?.expand?.players?.length ?? 0})</span></h2>
		{#if team?.expand?.players && team?.expand?.players?.length === 0}
			<p class="text-center">Aucun joueur dans l'équipe</p>
		{:else}
			<ul>
				{#each team?.expand?.players as player}
					<li class="flex w-full flex-nowrap items-center justify-between gap-2">
						<Avatar
							src={player.picture != ''
								? getImageURL(player.collectionId, player.id, player.picture, '24x24')
								: '/avatar.jpg'}
							fallback="/avatar.jpg"
							alt="Photos du joueur"
							class="avatar"
						/>
						<p class="p-2">
							<strong class="capitalize">
								{player.last_name ?? 'Non renseigné'}
							</strong>
							{' '}
							{player.first_name ?? 'Non renseigné'}
						</p>
						<p>{player.expand.position.name}</p>
						<p class="text-xl font-semibold">
							#{player.player_number ?? '?'}
						</p>
					</li>
				{/each}
			</ul>
		{/if}
	</CardsBasic>
	{/if}
	{#if !data.team}
								<button
									class="btn bg-primary-500 font-bold text-white hover:text-token hover:ring-primary-400-500-token hover:bg-transparent"
									on:click={() => {
										console.log('join team', team.id);
									}}>Rejoindre</button
								>
							{/if}
</section>