<script lang="ts">
	import '../app.postcss';
	import {
		AppShell,
		initializeStores,
		Modal,
		Toast,
		Drawer,
		LightSwitch
	} from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import HeaderPage from '$lib/Navigation/HeaderPage.svelte';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import Copyright from '$lib/components/Copyright.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	initializeStores();

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Modal />
<Toast />
<Drawer>
	<div class="head-drawer">
		<h2 class="text-xl font-semibold text-primary-500">Menu</h2>
		<LightSwitch />
	</div>
	<hr />
	<Navigation />
	<!-- deconection button -->
	{#if data.isConnected}
		<form action="/api/logout" method="POST">
			<button class="btn btn-sm absolute bottom-4 left-4">
				<svg
					class="fill-token h-8 w-8 hover:fill-on-primary-token"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					><path
						d="M5 11H13V13H5V16L0 12L5 8V11ZM3.99927 18H6.70835C8.11862 19.2447 9.97111 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.97111 4 8.11862 4.75527 6.70835 6H3.99927C5.82368 3.57111 8.72836 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.72836 22 5.82368 20.4289 3.99927 18Z"
					></path></svg
				>
			</button>
		</form>
	{/if}
</Drawer>
<!-- App Shell slotPageContent="content-grid"-->
<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64 relative">
	<svelte:fragment slot="header">
		<HeaderPage />
	</svelte:fragment>
	<!-- Page Route Content -->
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
		<div class="p-4">
			<LightSwitch />
		</div>
		{#if data.isConnected}
			<!-- deconection button -->
			<form action="/api/logout" method="POST">
				<button class="btn btn-sm absolute bottom-4 left-4">
					<svg
						class="fill-token h-8 w-8 hover:fill-on-primary-token"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						><path
							d="M5 11H13V13H5V16L0 12L5 8V11ZM3.99927 18H6.70835C8.11862 19.2447 9.97111 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.97111 4 8.11862 4.75527 6.70835 6H3.99927C5.82368 3.57111 8.72836 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.72836 22 5.82368 20.4289 3.99927 18Z"
						></path></svg
					>
				</button>
			</form>
		{/if}
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">
		<Copyright />
	</svelte:fragment>
	<!-- (footer) -->
</AppShell>

<style lang="postcss">
	.head-drawer {
		@apply flex items-center justify-between p-4;
	}
</style>
