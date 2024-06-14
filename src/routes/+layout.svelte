<script lang="ts">
	import '../app.postcss';
	import { AppShell, initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import HeaderPage from '$lib/components/HeaderPage.svelte';
	import SidebarPage from '$lib/components/SidebarPage.svelte';
	import Copyright from '$lib/components/Copyright.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();
</script>

<Modal />
<Toast />
<!-- App Shell -->
<AppShell slotPageContent="content-grid">
	<svelte:fragment slot="header">
		<HeaderPage />
	</svelte:fragment>
	<!-- Page Route Content -->
	<svelte:fragment slot="sidebarLeft">
		<SidebarPage />
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
