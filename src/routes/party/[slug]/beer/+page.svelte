<script lang="ts">
    export let data;
</script>

<div class="beer">
    <form action="?/addBeer" method="post" class="beer-for">
        <button type="submit">
            <img src="/beer.png" alt="asdf" />
        </button>
    </form>
    <hr>
    <a
        href="https://docs.google.com/spreadsheets/d/1VihgGCWKcQha8KXcgX4ZaPFwsEz-SZUs_db7xZAE8LI/edit?usp=sharing"
        >?</a
    >
    <hr>
    <div class="glasspanel beer-rankings">
        {#each Object.entries(data.party.beerPerAttendee) as entry, i}
            <div class:bold={i === 0}>
                {entry[0]}: {entry[1]}
                {#if i === 0}
                    👑{/if}
            </div>
        {/each}
    </div>
</div>

<style>
    .beer-for {
        display: flex;
        justify-content: center;
        height: 50vh;
    }
    .beer-for img {
        width: 100%;
        height: 100%;
    }
    .beer-for button {
        flex-grow: 1;
    }
    hr {
        border-color: black;
        margin-top: 1em;
        margin-bottom: 1em;
    }
</style>
