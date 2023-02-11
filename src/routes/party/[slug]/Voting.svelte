<script lang="ts">
    import { page } from '$app/stores';
    export let data

    export let options = $page.data.poll.options.map(it => {
        return {
            upvote: false,
            downvote: false,
            name: it,
            upvoteElementId: `upvote-${it}`,
            downvoteElementId: `downvote-${it}`
        }
    })
</script>
<div class="voting">
    {#if $page.data.isUserVoting}
        <form action="?/vote" method="POST">
            <ul>
                {#each options as option}
                    <li>
                        <span>{option.name}</span>
                        <div>
                            <label for="{option.upvoteElementId}" class:selected="{option.upvote}">👍 </label>

                            <input type="checkbox" name="{option.upvoteElementId}" id="{option.upvoteElementId}" bind:checked={option.upvote} on:change={e => { if (e.target.value) option.downvote = false }}>
                            <label for="{option.downvoteElementId}" class:selected="{option.downvote}">👎</label>

                            <input type="checkbox" name="{option.downvoteElementId}" id="{option.downvoteElementId}" bind:checked={option.downvote} on:change={e => { if (e.target.value) option.upvote = false }}>
                        </div>
                    </li>
                {/each}
            </ul>
            <button type="submit">Vote</button>
        </form>
    {:else}
        Waiting for:
        {#each $page.data.outstanding as attendee}
            <p>{attendee}</p>
        {/each}


    {/if}
</div>
<style>
    label {
        display: inline-block;
        background: rgb(255, 255, 255, 5%);
        padding: 2px 4px;
        border-radius: 5px;
        border: 1px solid rgb(255, 255, 255, 5%);
    }
    label.selected {
        background: rgb(255, 255, 255, 10%);
        border: 1px solid gray;
    }
    input {
        display: none;
    }
    ul {
        display: table;
    }
    li {
        display: table-row;
    }
    li > span {
        display: table-cell;
        min-width: 150px;
        justify-content: center;
    }


</style>