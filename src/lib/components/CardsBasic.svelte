<script lang='ts'>
    // Slots
	/**
	 * @slot header - Provides content on the left end of the bar, e.g. a logo.
	 * @slot footer - Provides content on the right end of the bar, e.g. navigation elements.
	 */

	import { goto } from "$app/navigation";

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
<div class={Card} on:click={goToUrl} tabindex="0" on:keydown={handleKeyDown} aria-label="navigate to url" role='button'>
    {#if $$slots.header}
        <header class={CardHeader}>
            <slot name=header >
                <h2 class="text-xl font-semibold text-primary-500 text-center">(title)</h2>
            </slot>
        </header>
    {/if}
    <section class={CardBody}>
       <slot />
    </section>
    {#if $$slots.footer}
        <footer class={CardFooter}>
            <slot name=footer />
        </footer>
    {/if}
</div>
