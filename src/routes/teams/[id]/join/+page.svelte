<script lang="ts">
	import { enhance } from '$app/forms';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { ActionData, PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;
	export let form: ActionData;

	const toastStore = getToastStore();

	let t: ToastSettings;
	$: if (form && form?.success) {
		t = {
			message: 'Joueur réclamé avec succès',
			background: 'bg-green-500'
		};
		toastStore.trigger(t);
		goto('/teams');
	} else if (form && form?.error) {
		t = {
			message: 'Erreur lors de la réclamation du joueur',
			background: 'bg-error-500'
		};
		toastStore.trigger(t);
	}
</script>

<svelte:head>
	<title>Rejoindre l'équipe {data.teamData.name}</title>
</svelte:head>

<section class="content-grid flow mt-4">
	<div class="card flex flex-col gap-2 p-4">
		<h1 class="text-center text-xl font-semibold text-primary-500">
			Rejoindre l'équipe {data.teamData.name}
		</h1>
		<p class="text-leg text-center">
			Vous êtes sur le point de rejoindre l'équipe {data.teamData.name}. Veuillez choisir le joueur
			parmi la liste.
		</p>
		<span class=""
			>Si la carte du joueur n'est pas disponible. Le manager n'a pas crée la carte du joueur ou que
			le joueur est déjà réclamer</span
		>
	</div>
	<div class="card flex flex-col gap-2 p-4">
		<h2 class="text-center text-lg font-semibold text-primary-500">Choisi un joueur</h2>
		<form method="POST" use:enhance class="flex flex-col gap-2">
			<div class="space-y-2">
				{#if data.teamData?.expand?.players}
					{#each data.teamData?.expand.players as player}
						{#if player.claimed && player.claimed === true}
							<label class="flex items-center space-x-2">
								<input class="radio" type="radio" name="playerID" value={player.id} disabled />
								<p class="text-primary-500">Déjà réclamer</p>
								<p>{player.last_name} {player.first_name}</p>
								<span>#{player.player_number}</span>
								{#if player.expand && player.expand.position}
									<span>{player.expand.position.name}</span>
								{/if}
							</label>
						{:else}
							<label class="flex items-center space-x-2">
								<input class="radio" type="radio" name="playerID" value={player.id} />
								<p>{player.last_name} {player.first_name}</p>
								<span>#{player.player_number}</span>
								{#if player.expand && player.expand.position}
									<span>{player.expand.position.name}</span>
								{/if}
							</label>
						{/if}
					{/each}

					<label class="flex items-center space-x-2">
						<input class="radio" type="radio" name="playerID" value="" />
						<p>Pas dans la liste</p>
					</label>
				{/if}
			</div>
			<label for="message" class="text-primary-500">Message</label>
			<textarea
				name="message"
				id="message"
				placeholder="Message pour aidé le manager de l'équipe"
				class="textarea"
				rows="4"
			/>
			<div class="flex justify-center">
				<button class="variant-filled-primary btn" type="submit">Rejoindre l'équipe</button>
			</div>
		</form>
	</div>
</section>
