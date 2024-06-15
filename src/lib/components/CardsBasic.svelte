<script lang='ts'>
export let title: string;

</script>
<div class="card">
    <header class="card-header">
        <h2 class="text-xl font-semibold text-primary-500 text-center">{title}</h2>
    </header>
    <section class="p-4">
       <slot />
    </section>
    <slot name=footer />
</div>
