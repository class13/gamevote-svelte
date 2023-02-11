<script>
	import './styles.css';
</script>
<header>
	<span class="bigletter">G</span>AMEV<span class="circle"/>T<span class="bigletter">E</span>
	<hr/>
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
