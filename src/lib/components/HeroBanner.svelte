<script lang="ts">
	import HandiBasket from '$lib/assets/img/handi_basket.jpg';

	export let name: string | undefined = undefined;
</script>

{#if name}
	<div
		class="full-width banner-hero relative grid place-content-center bg-cover bg-center text-center"
		style="background-image: url('{HandiBasket}') ;"
	>
		<h1 class=" text-4xl font-bold text-white">Bienvenue Team :</h1>
		<h2 class="text-3xl font-bold text-white">{name}</h2>
	</div>
{:else}
	<div
		class="full-width banner-hero relative grid place-content-center bg-cover bg-center text-center"
		style="background-image: url('{HandiBasket}') ;"
	>
		<h1 class=" text-4xl font-bold text-white">Bienvenue sur Teams Handy</h1>
	</div>
{/if}

<style lang="postcss">
	.banner-hero {
		height: 30vh;
		isolation: isolate;
	}
	.banner-hero::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		@apply variant-gradient-primary-secondary bg-gradient-to-b opacity-40;
	}
	@media (min-width: 640px) {
		.banner-hero {
			height: 40vh;
		}
	}
</style>
