<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
	<div class="mx-auto max-w-screen-sm text-center">
		<h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-500">
			{$page.status}
		</h1>
		<p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-[1rem]xl">
			{$page.error?.message}
		</p>
		<a
			href="/"
			class="inline-flex text-white bg-error-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
			>Retour a la page d'acceuil</a
		>
	</div>
</div>