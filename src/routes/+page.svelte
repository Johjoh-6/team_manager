<script lang="ts">
	import type { PageData } from './$types';
	import HeroBanner from '$lib/components/HeroBanner.svelte';
	import type { RecordModel } from 'pocketbase';
	import CardsBasic from '$lib/components/CardsBasic.svelte';
	import dateFormatFr from '$lib/utils/dateFormatFr';
	import { getImageURL } from '$lib/utils/getImageUrl';
	import { Avatar } from '@skeletonlabs/skeleton';
	import stripString from '$lib/utils/stripString';

	export let data: PageData;
	const team: RecordModel | null = data.team as RecordModel | null;
	const nextEvent: RecordModel[] | null = data.nextEvent as RecordModel[] | null;
	const newPlayers: RecordModel[] | null = data.newPlayers as RecordModel[] | null;
	const matchHistory: RecordModel[] | null = data.matchHistory as RecordModel[] | null;
</script>

<svelte:head>
	<title>Teams Handi</title>
</svelte:head>

<section class="content-grid flow">
	<HeroBanner name={team?.name} />
	{#if team?.id}
		<section class="grid grid-cols-2 gap-4 md:grid-cols-4">
			<CardsBasic
				classCard="card-hover"
				classCardBody="flex flex-col gap-1"
				urlToGo="/teams/{team?.id}"
			>
				<p class="text-center text-2xl font-bold">{team?.name}</p>
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
				<h2 slot="header" class="text-center text-xl font-semibold text-primary-500">
					Nombre de joueurs
				</h2>
				<p class="text-center text-2xl font-bold">{newPlayers ? newPlayers.length : 0}</p>
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
								<td class="capitalize">{stripString(event.name, 10)}</td>
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
			<CardsBasic
				classCard="col-span-2 card-hover"
				urlToGo="/players"
				classCardBody="flex flex-col gap-1"
			>
				<h2 slot="header" class="text-xl font-semibold text-primary-500">Nouveaux joueurs</h2>
				<section class="p-4">
					{#if newPlayers}
						<ul>
							{#each newPlayers as player}
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
									<p class="text-xl font-semibold">
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

			<!-- Match History Card -->
			<CardsBasic
				classCard="col-span-2 card-hover"
				urlToGo="/match-history"
				classCardBody="flex flex-col gap-1"
			>
				<h2 slot="header" class="text-xl font-semibold text-primary-500">
					Historique des derniers matchs
				</h2>
				{#if matchHistory}
					<table class="table-compact">
						<thead class="border-b-2 border-primary-500">
							<tr>
								<th>Date</th>
								<th>Adversaire</th>
								<th>Résultat</th>
							</tr>
						</thead>
						{#each matchHistory as match}
							<tr class="text-center">
								<td>{dateFormatFr(match.match_date)}</td>
								<td>{stripString(match.team_opponent_name, 10)}</td>
								<td>{match.score} / {match.score_opponent}</td>
							</tr>
						{/each}
					</table>
				{:else}
					<p>Aucun match joué</p>
				{/if}
			</CardsBasic>
		</section>
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
						href="/teams/creer"
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
						href="/teams"
						class="btn w-full bg-primary-500 font-bold text-white hover:text-token hover:ring-primary-400-500-token hover:bg-transparent"
						>Rejoindre</a
					>
				</footer>
			</div>
			<a href="/about" 
			class="btn p-2 text-xl font-semibold hover:variant-ghost-primary bg-primary-500"
			data-sveltekit-preload-data="hover">
				A propos de Teams Handi
			</a>
		</section>
	{/if}
</section>
