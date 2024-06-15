<script lang="ts">
	import type { PageData } from './$types';
	import HeroBanner from '$lib/components/HeroBanner.svelte';
	import type { RecordModel } from 'pocketbase';

	export let data: PageData;
	const team: RecordModel | null = data.team as RecordModel | null;
	console.log(team);

</script>

<svelte:head>
	<title>Teams Handy</title>
</svelte:head>

<HeroBanner name={team?.name} />
{#if team}
<section class="grid grid-cols-1 gap-4 md:grid-cols-2">
	<div class="card">
		<header class="card-header">
			<h2 class="text-xl font-semibold text-primary-500">Nombre de joueurs</h2>
		</header>
		<section class="p-4">
			<p class="text-4xl">
				{team.expand?.players.lenght}
			</p>
		</section>
	</div>
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
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam repellat harum quo nobis
					assumenda minus aliquid mollitia nihil iusto. Molestiae vero inventore tenetur atque sed
					laboriosam asperiores deserunt nam. Mollitia!
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
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam repellat harum quo nobis
					assumenda minus aliquid mollitia nihil iusto. Molestiae vero inventore tenetur atque sed
					laboriosam asperiores deserunt nam. Mollitia!
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
