<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
	<div class="mx-auto max-w-screen-sm text-center">
		<h1 class="mb-4 text-7xl font-extrabold tracking-tight text-primary-500 lg:text-9xl">
			{$page.status}
		</h1>
		<p class="md:text-[1rem]xl mb-4 text-3xl font-bold tracking-tight text-gray-900">
			{$page.error?.message}
		</p>
		<a
			href="/"
			class="inline-flex rounded-lg bg-error-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
			>Retour a la page d'acceuil</a
		>
	</div>
</div>
