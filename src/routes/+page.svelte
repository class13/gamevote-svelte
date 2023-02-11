<script>
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<form action="?/createparty" method="POST">
	<div class="wrapper">
		<button type="submit">New Lobby</button>
	</div>
</form>

<style>
	form {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.wrapper {
		padding-bottom: 100px;
	}
	button {
		padding: 10px 30px;
		border: 1px solid rgb(0, 0, 0, 70%);
	}
	button:hover {
		background: rgb(255, 255, 255, 15%);
		border: 1px solid rgb(0, 0, 0, 40%);
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
