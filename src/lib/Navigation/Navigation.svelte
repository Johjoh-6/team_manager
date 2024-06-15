<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav flex-grow p-4">
	<ul>
		<li><a href="/" on:click={drawerClose}>Accueil</a></li>
		<li><a href="/calendar" on:click={drawerClose}>Calendrier</a></li>
		<li><a href="/players" on:click={drawerClose}>Nos joueurs</a></li>
		<li><a href="/history" on:click={drawerClose}>Historique de match</a></li>
	</ul>
</nav>
