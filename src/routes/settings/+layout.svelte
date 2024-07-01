<script lang="ts">
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';
	const navigation = [
		{
			title: 'Profil',
			href: '/settings/profile'
		},
		{
			title: 'Compte',
			href: '/settings/account'
		},
		{
			title: 'Securité',
			href: '/settings/security'
		}
	];
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<div class="grid grid-cols-[auto_1fr] w-full">
	<AppRail background="transparant">
		{#each navigation as navItem}
		<AppRailAnchor href={navItem.href} selected={$page.url.pathname === navItem.href}
		>{navItem.title}</AppRailAnchor
		>
		{/each}
	</AppRail>
	<section class="content-grid p-4 place-items-center">
		<slot />
	</section>
</div>
