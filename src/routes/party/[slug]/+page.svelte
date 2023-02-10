<script>
    import Nomination from "./Nomination.svelte";
    export let data
</script>

<div class="party">
    <form method="POST">
        <button formaction="?/startNomination">Nomination</button>
        <button formaction="?/startVoting">Voting</button>
        <button formaction="?/startResults">Results</button>
    </form>
    <span>Status {data.party.status}</span>
    <Nomination/>
</div>
