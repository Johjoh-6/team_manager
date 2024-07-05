<script lang="ts">
	import { AppRail, AppRailAnchor, TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

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
	let clientWidth = 0;
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<svelte:window bind:innerWidth={clientWidth} />

<div class="grid w-full md:grid-cols-[auto_1fr]">
	{#if clientWidth > 1024}
		<AppRail background="transparant">
			{#each navigation as navItem}
				<AppRailAnchor href={navItem.href} selected={$page.url.pathname === navItem.href}
					>{navItem.title}</AppRailAnchor
				>
			{/each}
		</AppRail>
	{:else}
		<TabGroup
			justify="justify-center"
			active="variant-filled-primary"
			hover="hover:variant-soft-primary"
			flex="flex-1 lg:flex-none"
			rounded=""
			border=""
			class="bg-surface-100-800-token w-full"
		>
			{#each navigation as navItem}
				<TabAnchor href={navItem.href} selected={$page.url.pathname === navItem.href}>
					{navItem.title}
				</TabAnchor>
			{/each}
		</TabGroup>
	{/if}
	<section class="content-grid place-items-center p-4">
		<slot />
	</section>
</div>
