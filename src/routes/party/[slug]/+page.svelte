<script>
    import Nomination from "./Nomination.svelte";
    import Voting from "./Voting.svelte";
    import Result from "./Result.svelte";
    export let data
</script>

<div class="party">
    <form method="POST">
        <button formaction="?/startNomination">Nomination</button>
        <button formaction="?/startVoting">Voting</button>
        <button formaction="?/startResults">Results</button>
    </form>
    <span>Status {data.party.status}</span>
    {#if data.party.status === "NOMINATION"}
    <Nomination/>
    {:else if data.party.status === "VOTING"}
    <Voting/>
    {:else}
        <Result/>
    {/if}
</div>
