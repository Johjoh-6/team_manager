<script lang="ts">
	// Slots
	/**
	 * @slot header - Provides content on the left end of the bar, e.g. a logo.
	 * @slot footer - Provides content on the right end of the bar, e.g. navigation elements.
	 */

	import { goto } from '$app/navigation';

	export let urlToGo: string | null = null;
	export let classCard = '';
	export let classCardHeader = '';
	export let classCardBody = '';
	export let classCardFooter = '';

	const cardBase = 'card';
	const cardBaseHeader = 'card-header';
	const cardBaseBody = 'p-4';
	const cardBaseFooter = 'card-footer';

	$: Card = `${cardBase} ${classCard}`;
	$: CardHeader = `${cardBaseHeader} ${classCardHeader}`;
	$: CardBody = `${cardBaseBody} ${classCardBody}`;
	$: CardFooter = `${cardBaseFooter} ${classCardFooter}`;

	function goToUrl() {
		if (urlToGo) {
			goto(urlToGo);
		}
	}
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			goToUrl();
		}
	}
</script>

{#if urlToGo}
	<button
		class={Card}
		on:click={goToUrl}
		on:keydown={handleKeyDown}
		aria-label="navigate to url"
		tabindex="0"
	>
		{#if $$slots.header}
			<header class={CardHeader}>
				<slot name="header">
					<h2 class="text-center text-xl font-semibold text-primary-500">(title)</h2>
				</slot>
			</header>
		{/if}
		<section class={CardBody}>
			<slot />
		</section>
		{#if $$slots.footer}
			<footer class={CardFooter}>
				<slot name="footer" />
			</footer>
		{/if}
	</button>
{:else}
	<div class={Card}>
		{#if $$slots.header}
			<header class={CardHeader}>
				<slot name="header">
					<h2 class="text-center text-xl font-semibold text-primary-500">(title)</h2>
				</slot>
			</header>
		{/if}
		<section class={CardBody}>
			<slot />
		</section>
		{#if $$slots.footer}
			<footer class={CardFooter}>
				<slot name="footer" />
			</footer>
		{/if}
	</div>
{/if}
