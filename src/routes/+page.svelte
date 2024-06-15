<script lang="ts">
	import type { PageData } from './$types';
	import HeroBanner from '$lib/components/HeroBanner.svelte';
	import type { RecordModel } from 'pocketbase';
	import CardsBasic from '$lib/components/CardsBasic.svelte';
	import dateFormatFr from '$lib/utils/dateFormatFr';
	import { getImageURL } from '$lib/utils/getImageUrl';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data: PageData;
	const team: RecordModel | null = data.team as RecordModel | null;
	const nextEvent: RecordModel[] | null = data.nextEvent as RecordModel[] | null;
	// console.log(nextEvent);
	console.log(team);
</script>

<svelte:head>
	<title>Teams Handy</title>
</svelte:head>

<section class="content-grid flow">
	<HeroBanner name={team?.name} />
	{#if team?.id}
		<section class="grid grid-cols-2 gap-4 md:grid-cols-4">
			<CardsBasic classCardBody="flex flex-col gap-1">
				<p class="text-center text-2xl font-bold">{team?.name}</p>
				{#if team.logo}
					<img
						src={getImageURL(team.collectionId, team.id, team.logo, '24x24')}
						alt="Logo de l'équipe"
						class="logo mx-auto h-24 w-24 logo-shadow dark:logo-shadow"
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
				<h2 slot="header" class="text-center text-xl font-semibold text-primary-500">
					Nombre de joueurs
				</h2>
				<p class="text-center text-2xl font-bold">{team?.expand?.players?.length ?? 0}</p>
			</CardsBasic>
			<!-- Next Event Card -->
			<CardsBasic
				classCard="col-span-2 card-hover"
				urlToGo="/calendar"
				classCardBody="flex flex-col gap-1"
			>
				<h2 slot="header" class="text-center text-xl font-semibold text-primary-500">
					Prochain événement
				</h2>
				{#if nextEvent}
					<table class="table-compact">
						<thead class="border-b-2 border-primary-500">
							<tr>
								<th>Nom</th>
								<th>Type</th>
								<th>Date</th>
							</tr>
						</thead>
						{#each nextEvent as event}
							<tr class="text-center">
								<td class="capitalize">{event.name}</td>
								<td class="capitalize">{event?.expand?.type.name}</td>
								<td>{dateFormatFr(event.date_start)}</td>
							</tr>
						{/each}
					</table>
				{:else}
					<p>Pas d'événement prévu</p>
				{/if}
			</CardsBasic>

			<!-- List of Players Card -->
			 <CardsBasic classCard="col-span-2 card-hover" urlToGo="/players" classCardBody="flex flex-col gap-1" >
				<h2 slot="header" class="text-xl font-semibold text-primary-500">Liste des joueurs</h2>
				<section class="p-4">
					{#if team?.expand?.players?.length > 0}
						<ul>
							{#each team?.expand?.players as player}
								<li class="flex flex-nowrap items-center gap-2 w-full justify-between">
									<Avatar
										initials={`${player.first_name?.charAt(0) ?? ''}${player.last_name?.charAt(0) ?? ''}`}
										src={getImageURL(player.collectionId, player.id, player.picture, '24x24')}
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
										<p class="font-semibold text-xl">
											{player.player_number ?? '?'}
										</p>
								</li>
							{/each}
						</ul>
					{:else}
						<p>Aucun joueur dans l'équipe</p>
					{/if}
				</section>
			</CardsBasic>
			<!-- <div class="card">
		<header class="card-header">
		  <h2 class="text-xl font-semibold text-primary-500">Liste des joueurs</h2>
		</header>
		<section class="p-4">
		  {#if team.expand.players.length > 0}
			<ul>
			  {#each team.expand.players as player}
				<li>{player.name}</li>
			  {/each}
			</ul>
		  {:else}
			<p>Aucun joueur dans l'équipe</p>
		  {/if}
		</section>
	  </div>
	
	  <!-- Match History Card -->
			<!-- <div class="card">
		<header class="card-header">
		  <h2 class="text-xl font-semibold text-primary-500">Historique des matchs</h2>
		</header>
		<section class="p-4">
		  {#if team.matchHistory.length > 0}
			<ul>
			  {#each team.matchHistory as match}
				<li>
				  <span class="font-bold">{match.date}</span> - {match.opponent}: {match.result}
				</li>
			  {/each}
			</ul>
		  {:else}
			<p>Aucun match joué</p>
		  {/if}
		</section>
	  </div> -->
		</section>
		<!-- <section class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="card">
			<header class="card-header">
				<h2 class="text-xl font-semibold text-primary-500">Prochaine évenement</h2>
			</header>
			<section class="p-4">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam repellat harum quo nobis
					assumenda minus aliquid mollitia nihil iusto. Molestiae vero inventore tenetur atque sed
					laboriosam asperiores deserunt nam. Mollitia!
				</p>
			</section>
		</div>
	</section> -->
	{:else}
		<section class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="card">
				<header class="card-header">
					<h2 class="text-xl font-semibold text-primary-500">Crée ton équipe</h2>
				</header>
				<section class="p-4">
					<p>
						Créez votre propre équipe de sport en sélectionnant vos joueurs, en définissant les
						rôles et en élaborant des stratégies gagnantes. Utilisez les outils de gestion d'équipe
						pour organiser les entraînements, les matchs et bien plus encore.
					</p>
				</section>
				<footer class="card-footer">
					<a
						href="/creer"
						class="btn w-full bg-primary-500 font-bold text-white hover:text-token hover:ring-primary-400-500-token hover:bg-transparent"
						>Crée</a
					>
				</footer>
			</div>
			<div class="card">
				<header class="card-header">
					<h2 class="text-xl font-semibold text-primary-500">Rejoindre une équipe</h2>
				</header>
				<section class="p-4">
					<p>
						Rejoignez une équipe sportive existante et mettez vos compétences au service du groupe.
						Participez aux entraînements, aux matchs et contribuez à l'esprit d'équipe. Trouvez des
						équipes qui cherchent de nouveaux talents et intégrez-vous rapidement.
					</p>
				</section>
				<footer class="card-footer">
					<a
						href="/rejoindre"
						class="btn w-full bg-primary-500 font-bold text-white hover:text-token hover:ring-primary-400-500-token hover:bg-transparent"
						>Rejoindre</a
					>
				</footer>
			</div>
		</section>
	{/if}
</section>

