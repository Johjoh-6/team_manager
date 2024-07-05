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
		<li>
			<a
				class="btn p-2 text-xl font-semibold hover:variant-ghost-primary {$page.url.pathname === '/'
					? 'bg-primary-active-token'
					: 'variant-ghost-surface'}"
				href="/"
				on:click={drawerClose}
				aria-current={$page.url.pathname === '/' ? 'page' : undefined}>Accueil</a
			>
		</li>
		{#if $page.data.isConnected}
			<li>
				<a
					class="btn p-2 text-xl font-semibold hover:variant-ghost-primary {$page.url.pathname.startsWith(
						'/teams'
					)
						? 'bg-primary-active-token'
						: 'variant-ghost-surface'}"
					href="/teams"
					on:click={drawerClose}
					aria-current={$page.url.pathname.startsWith('/teams') ? 'page' : undefined}>Équipe</a
				>
			</li>
			<li>
				<a
					class="btn p-2 text-xl font-semibold hover:variant-ghost-primary {$page.url.pathname.startsWith(
						'/calendar'
					)
						? 'bg-primary-active-token'
						: 'variant-ghost-surface'}"
					href="/calendar"
					on:click={drawerClose}
					aria-current={$page.url.pathname.startsWith('/calendar') ? 'page' : undefined}
					data-sveltekit-preload-data="hover">Calendrier</a
				>
			</li>
			<li>
				<a
					class="btn p-2 text-xl font-semibold hover:variant-ghost-primary {$page.url.pathname.startsWith(
						'/players'
					)
						? 'bg-primary-active-token'
						: 'variant-ghost-surface'}"
					href="/players"
					on:click={drawerClose}
					aria-current={$page.url.pathname.startsWith('/players') ? 'page' : undefined}
					data-sveltekit-preload-data="hover">Nos joueurs</a
				>
			</li>
			<li>
				<a
					class="btn p-2 text-xl font-semibold hover:variant-ghost-primary {$page.url.pathname.startsWith(
						'/history'
					)
						? 'bg-primary-active-token'
						: 'variant-ghost-surface'}"
					href="/history"
					on:click={drawerClose}
					aria-current={$page.url.pathname.startsWith('/history') ? 'page' : undefined}
					data-sveltekit-preload-data="hover">Historique de match</a
				>
			</li>
			{#if $page.data.isManager}
				<li>
					<a
						class="btn p-2 text-xl font-semibold hover:variant-ghost-primary {$page.url.pathname.startsWith(
							'/manager'
						)
							? 'bg-primary-active-token'
							: 'variant-ghost-surface'}"
						href="/manager"
						on:click={drawerClose}
						aria-current={$page.url.pathname.startsWith('/manager') ? 'page' : undefined}
						data-sveltekit-preload-data="hover">Requetes</a
					>
				</li>
			{/if}
			<li>
				<a
					class="btn p-2 text-xl font-semibold hover:variant-ghost-primary {$page.url.pathname.startsWith(
						'/settings'
					)
						? 'bg-primary-active-token'
						: 'variant-ghost-surface'}"
					href="/settings/profile"
					on:click={drawerClose}
					aria-current={$page.url.pathname.startsWith('/history') ? 'page' : undefined}
					data-sveltekit-preload-data="hover">Paramètres</a
				>
			</li>
		{/if}
		<li>
			<a
				class="btn p-2 text-xl font-semibold hover:variant-ghost-primary {$page.url.pathname.startsWith(
					'/about'
				)
					? 'bg-primary-active-token'
					: 'variant-ghost-surface'}"
				href="/about"
				on:click={drawerClose}
				aria-current={$page.url.pathname.startsWith('/about') ? 'page' : undefined}
				data-sveltekit-preload-data="hover">A propos</a
			>
		</li>
	</ul>
</nav>
