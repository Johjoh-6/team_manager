<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import UserIcons from './UserIcons.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<!-- App Bar -->
<AppBar
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
	background="bg-surface-200-700-token"
>
	<svelte:fragment slot="lead">(icon)</svelte:fragment>
	<strong class="text-xl uppercase text-nowrap">Handy Team</strong>
	<svelte:fragment slot="trail">
		<LightSwitch />
		<UserIcons />
	</svelte:fragment>
</AppBar>

<style>
</style>
