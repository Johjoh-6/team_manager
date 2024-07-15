<script lang="ts">
	const year = new Date().getFullYear();
</script>

<div class="flex w-full flex-col justify-center gap-2 p-1 md:flex-row">
	<p class="text-tertiary-700-200-token text-nowrap text-center">
		Copyright Teams Handi 2024 - {year}
	</p>
	<a
		href="/rgpd"
		class="text-tertiary-700-200-token cursor-pointer text-nowrap text-center hover:text-primary-500"
	>
		Informations Légales & Politique de confidentialité
	</a>
</div>

<style lang="postcss">
	p {
		line-height: 1.1;
		font-size: 0.6rem;
	}
	a {
		font-size: 0.6rem;
		line-height: 1.1;
	}
</style>
