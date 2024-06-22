<script lang="ts">
	import { AppBar, getDrawerStore } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const drawerStore = getDrawerStore();

	const handleClick = () => {
		// TODO add menu logic here. Drawer or sidebar
		if ($page.data.isConnected) {
			drawerStore.open({});
		} else {
			goto('/login');
		}
	};
</script>

<!-- App Bar -->
<AppBar
	gridColumns="grid-cols-4"
	slotDefault="place-self-center col-span-2"
	slotTrail="place-content-end"
	background="bg-surface-200-700-token"
>
	<svelte:fragment slot="lead">(icon)</svelte:fragment>
	<strong class="text-nowrap text-2xl uppercase text-primary-500">Handy Team</strong>
	<svelte:fragment slot="trail">
		{#if $page.data.isConnected}
			<button class="btn btn-sm lg:hidden" on:click={handleClick}>
				<svg class="fill-token h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg
				>
			</button>
		{:else}
			<button class="btn btn-sm" on:click={handleClick}>
				<svg class="fill-token h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><path
						d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"
					></path></svg
				>
			</button>
		{/if}
	</svelte:fragment>
</AppBar>

<style>
</style>
