<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav flex-grow p-4">
	<ul class="flex flex-col gap-1"> 
		<li><a class="btn hover:variant-ghost-primary text-xl font-semibold p-2 {$page.url.pathname === '/' ? 'bg-primary-active-token' : 'variant-ghost-surface'}" href="/" on:click={drawerClose} aria-current={$page.url.pathname === '/' ? 'page' : undefined}>Accueil</a></li>
		<li><a class="btn hover:variant-ghost-primary text-xl font-semibold p-2 {$page.url.pathname === '/calendar' ? 'bg-primary-active-token' : 'variant-ghost-surface'}" href="/calendar" on:click={drawerClose} aria-current={$page.url.pathname === '/calendar' ? 'page' : undefined} data-sveltekit-preload-data="hover">Calendrier</a></li>
		<li><a class="btn hover:variant-ghost-primary text-xl font-semibold p-2 {$page.url.pathname === '/players' ? 'bg-primary-active-token' : 'variant-ghost-surface'}" href="/players" on:click={drawerClose} aria-current={$page.url.pathname === '/players' ? 'page' : undefined} data-sveltekit-preload-data="hover">Nos joueurs</a></li>
		<li><a class="btn hover:variant-ghost-primary text-xl font-semibold p-2 {$page.url.pathname === '/history' ? 'bg-primary-active-token' : 'variant-ghost-surface'}" href="/history" on:click={drawerClose} aria-current={$page.url.pathname === '/history' ? 'page' : undefined} data-sveltekit-preload-data="hover">Historique de match</a></li>
	</ul>
</nav>
