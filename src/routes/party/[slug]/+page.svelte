<script>
    import Nomination from "./Nomination.svelte";
    import Voting from "./Voting.svelte";
    import Result from "./Result.svelte";
    export let data

    export let statusButtons = {
        nomination: {
        },
        voting: {
            disabled: false,
        },
        results: {
            disabled: false
        }
    }
    Object.keys(statusButtons).forEach(it => {
        statusButtons[it].selected = data.party.status == it.toUpperCase()
    })
</script>

<div class="party">
    <div class="header">
        <form method="POST">
            <button formaction="?/startNomination"
                    disabled="{statusButtons.nomination.disabled}"
                    class:selected={statusButtons.nomination.selected}>
                Nomination
            </button>
            <button formaction="?/startVoting"
                    disabled="{statusButtons.voting.disabled}"
                    class:selected={statusButtons.voting.selected}>
                Voting
            </button>
            <button formaction="?/startResults"
                    disabled="{statusButtons.results.disabled}"
                    class:selected={statusButtons.results.selected}>
                <!-- todo: bug: when clicking on results from votes it goes to nomination -->
                Results
            </button>
        </form>
    </div>

    {#if data.party.status === "NOMINATION"}
    <Nomination/>
    {:else if data.party.status === "VOTING"}
    <Voting/>
    {:else}
        <Result/>
    {/if}
</div>
<style>
    button {
        border: 2px solid rgb(255, 255, 255, 5%);
    }
    button.selected {
        border: 2px solid rgb(255, 255, 255, 20%);
        background: rgb(255, 255, 255, 5%);
    }
</style>
