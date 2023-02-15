<script>
	import './styles.css';
	export let subtitle = "Home"
</script>
<svelte:head>
	<title>Gamevote - {subtitle}</title>
	<meta name="description" content="Vote your Game!" />
</svelte:head>
<header>
	<img src="/logo.png" height="70px">
</header>
<div class="app">
	<main>
		<div class="page glasspanel">
			<slot />
		</div>
	</main>
</div>

<style>
	.page {
		min-width: 600px;
	}
	@media only screen and (max-width: 600px) {
		.page {
			width: 100%;
			min-width: auto;
		}
	}
	.circle {
		content: url("/circle.png");
		height: 45px;
		width: 45px;
		display: inline-block;
	}
	hr {
		border: none;
		border-bottom: 1px solid rgb(255, 255, 255, 60%);
		padding: 0;
		margin: 10px;
	}
</style>
