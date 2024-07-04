<script lang="ts">
	const year = new Date().getFullYear();
</script>

<div class="w-full p-1 flex gap-2 justify-center">
	<p class="text-tertiary-700-200-token text-nowrap text-center">
		Copyright Handy Team 2024 - {year}
	</p>
	<a href="/rgpd" class="text-tertiary-700-200-token text-nowrap text-center cursor-pointer hover:text-primary-500">
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
