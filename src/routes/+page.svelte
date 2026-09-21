<script lang="ts">
	let { data } = $props();
</script>

<main class="start-page">
	<section class="new-party">
		<form action="?/createparty" method="POST">
			<button class="bg-color-blue-200" type="submit">New Lobby</button>
		</form>
	</section>

	{#if data.recentParties.length > 0}
		<section class="recent-parties" aria-labelledby="recent-parties-title">
			<h1 id="recent-parties-title">Recent parties</h1>
			<div class="party-list">
				{#each data.recentParties as party}
					<a class="party-card" href="/party/{party.code}">
						<span class="party-code">{party.code}</span>
						<span class="party-details">
							{party.status.toLowerCase()} · {party.attendeeCount} attendee{party.attendeeCount === 1 ? "" : "s"} · {party.beerCount} 🍺
						</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}
</main>

<style>
	.start-page {
		width: min(100%, 42rem);
		margin: 0 auto;
		padding: 2rem 1rem 4rem;
	}

	.new-party {
		display: flex;
		min-height: 14rem;
		align-items: center;
		justify-content: center;
	}

	form {
		display: flex;
		justify-content: center;
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
		margin-bottom: 0.75rem;
		font-size: 1.25rem;
	}

	.party-list {
		display: grid;
		gap: 0.6rem;
	}

	.party-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.85rem 1rem;
		border: 1px solid rgb(255, 255, 255, 18%);
		border-radius: 0.75rem;
		background: rgb(255, 255, 255, 5%);
		text-decoration: none;
	}

	.party-card:hover {
		background: rgb(255, 255, 255, 10%);
	}

	.party-code {
		font-family: monospace;
		font-size: 1.15rem;
		font-weight: 700;
	}

	.party-details {
		color: rgb(255, 255, 255, 65%);
		font-size: 0.85rem;
		text-align: right;
	}

	@media (max-width: 640px) {
		.party-card {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.25rem;
		}

		.party-details {
			text-align: left;
		}
	}
</style>
