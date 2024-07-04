<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    const statusColor = (status: string)=> {
        switch(status){
            case 'available':
                return 'variant-filled-success';
            case 'progress':
                return 'variant-filled-secondary';
            case 'pending':
                return 'variant-filled-warning';
            default:
                return 'variant-filled';
        }
    
    }
    const translateStatus = (status: string)=> {
        switch(status){
            case 'available':
                return 'Disponible';
            case 'progress':
                return 'En cours';
            case 'pending':
                return 'A venir';
            default:
                return 'Inconnu';
        }
    
    }
</script>

<section class="content-grid mt-4 flow">
    <div class="full-width grid place-content-center">
        <h1>Roadmap</h1>
        <p class="text-center">C'est ici que nous vous informerons sur le futur de l'application</p>
    </div>
    {#each data.roadmap as r}
        
        <div class="flex flex-col gap-2">
            <h2>{r.title} <span class="badge {statusColor(r.status)}">{translateStatus(r.status)}</span></h2>
            {@html r.description}
            </div>
    {/each}
    
</section>

<style lang="postcss">
    h1{
        @apply text-3xl text-primary-500 text-center font-bold p-4;
    }
    h2{
        @apply text-xl text-primary-500 font-bold text-center p-4;
    }
</style>