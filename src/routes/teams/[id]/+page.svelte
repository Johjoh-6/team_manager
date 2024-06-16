<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Teams {data.team.name}</title>
</svelte:head>

<section class="content-grid flow">
	<h1>{data.team.name}</h1>
</section>
