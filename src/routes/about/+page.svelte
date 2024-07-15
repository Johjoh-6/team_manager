<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const statusColor = (status: string) => {
		switch (status) {
			case 'available':
				return 'variant-filled-success';
			case 'progress':
				return 'variant-filled-secondary';
			case 'pending':
				return 'variant-filled-warning';
			default:
				return 'variant-filled';
		}
	};
	const translateStatus = (status: string) => {
		switch (status) {
			case 'available':
				return 'Disponible';
			case 'progress':
				return 'En cours';
			case 'pending':
				return 'A venir';
			default:
				return 'Inconnu';
		}
	};
</script>

<section class="content-grid flow">
	<div
		class="full-width variant-gradient-primary-secondary grid place-content-center bg-gradient-to-br p-4"
	>
		<h2>A propos de nous</h2>
		<p>
			Bienvenue sur Teams Handi, la plateforme innovante dédiée à la gestion des équipes et des
			matchs pour les sports adaptés. Nous croyons que chaque athlète, qu'il soit valide ou en
			situation de handicap, mérite les meilleurs outils pour gérer et optimiser ses performances.
			C'est pourquoi nous avons créé Teams Handi, une solution complète et intuitive pour les
			fédérations sportives, les managers, et les capitaines d'équipe.
		</p>
	</div>
	<div class="card grid place-content-center p-4">
		<h3>Notre Mission</h3>
		<p>
			Notre mission est de faciliter la gestion des équipes et des compétitions pour les sports
			adaptés. Nous voulons offrir aux fédérations sportives, aux managers et aux capitaines
			d'équipe une plateforme puissante et facile à utiliser, qui les aide à organiser leurs
			équipes, suivre les performances des joueurs, et gérer les matchs et les tournois avec
			efficacité.
		</p>
	</div>
	<div class="card grid place-content-center p-4">
		<h3>Nos Valeurs</h3>
		<ul>
			<li>
				<strong>Accessibilité :</strong> Nous nous engageons à rendre notre plateforme accessible à tous,
				en respectant les normes d'accessibilité et en offrant une expérience utilisateur optimale sur
				tous les appareils.
			</li>
			<li>
				<strong>Innovation :</strong> Nous innovons constamment pour offrir de nouvelles fonctionnalités
				et améliorer celles existantes, afin de répondre aux besoins évolutifs de nos utilisateurs.
			</li>
			<li>
				<strong>Communauté :</strong> Nous croyons en la force de la communauté sportive et nous nous
				efforçons de créer des outils qui favorisent la collaboration et la communication entre les membres
				de chaque équipe.
			</li>
			<li>
				<strong>Fiabilité :</strong> La fiabilité de notre plateforme est une priorité absolue. Nous
				mettons tout en œuvre pour garantir la sécurité et la stabilité de nos services.
			</li>
		</ul>
	</div>
	<div class="card grid place-content-center p-4">
		<h3>Notre Équipe</h3>
		<p>
			Notre équipe est composée de passionnés de sport et de technologie, dévoués à créer une
			plateforme qui répond aux besoins spécifiques des sports adaptés. Nous travaillons en étroite
			collaboration avec des fédérations sportives, des entraîneurs, des managers et des athlètes
			pour nous assurer que Teams Handi est une solution pratique et efficace.
		</p>
	</div>
	<div class="card grid place-content-center p-4">
		<h3>Rejoignez-nous</h3>
		<p>
			Nous sommes toujours à la recherche de nouveaux talents pour rejoindre notre équipe et nous
			aider à améliorer Teams Handi. Si vous partagez notre passion pour le sport et la technologie,
			n'hésitez pas à nous contacter pour en savoir plus sur les opportunités disponibles.
		</p>
	</div>
	<div class="card grid place-content-center p-4">
		<h3>Contactez-nous</h3>
		<p>
			Pour toute question, suggestion ou demande d'assistance, vous pouvez nous contacter à
			l'adresse suivante : <a href="mailto:support@johann-six.fr">support@johann-six.fr</a>. Nous
			serons ravis de vous aider.
		</p>
	</div>
	<div
		class="full-width variant-gradient-primary-secondary grid place-content-center bg-gradient-to-br p-4"
	>
		<h2>Roadmap</h2>
		<p class="text-center">C'est ici que nous vous informerons sur le futur de l'application</p>
	</div>
	{#each data.roadmap as r}
		<div class="flex flex-col gap-2">
			<h3>
				{r.title} <span class="badge {statusColor(r.status)}">{translateStatus(r.status)}</span>
			</h3>
			{@html r.description}
		</div>
	{/each}
</section>

<style lang="postcss">
	h2 {
		@apply p-4 text-center text-3xl font-bold;
	}
	h3 {
		@apply p-4 text-center text-xl font-bold text-primary-500;
	}
</style>
