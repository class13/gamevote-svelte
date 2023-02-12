<script lang="ts">
    import { page } from '$app/stores';
    export let data
    export let results = $page.data.results as {option: string, votes: number}[]
    let biggestVote = results[0].votes
    results = results.map((it) => {
        return {
            ...it,
            cssClass: it.votes == biggestVote ? "green" : (it.votes < 0 ? "red" : "white")
        }
    })

</script>
<div class="results">
    <table class="glasspanel">
        {#each results as result}
            <tr class="{result.cssClass}">
                <td class="option">{result.option}</td>
                <td class="votes">{result.votes}</td>
            </tr>
        {/each}
    </table>
</div>
<style>
    .results{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .option {
        padding-right: 30px;
    }
    .red {
        color: rgb(255, 0, 0, 50%);
    }
    .green {
        color: rgb(0, 255, 0, 50%);
        font-size: 16px;
    }
    .white {
        color: rgb(255, 255, 255, 50%);
    }
    .votes {
        text-align: right;
    }
</style>