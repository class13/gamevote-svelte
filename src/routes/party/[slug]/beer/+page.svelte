<script lang="ts">
    export let data;
</script>

<div class="">
    <form action="?/addBeer" method="post" class="flex justify-center py-10">
        <div></div>
        <button type="submit" class="bg-neutral-600 hover:bg-neutral-700 rounded-xl p-2 px-5 text-7xl ring shadow-xl/30 hover:shadow-xl/10">
            {data.party.beerCount}🍺
        </button>
    </form>
    <div class="text-xl">Scores</div>
    <div class="glasspanel flex justify-center">
        <table class="table-auto">
            <tbody>
                {#each Object.entries(data.party.beerPerAttendee) as entry, i}
                    <tr class:font-bold={i === 0}>
                        <td class="px-1">{entry[0]}:</td>
                        <td class="px-1">
                            {entry[1]}
                            {#if i === 0}👑{/if}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div class="mt-30 link-list">
    <a
       href="https://docs.google.com/spreadsheets/d/1VihgGCWKcQha8KXcgX4ZaPFwsEz-SZUs_db7xZAE8LI/edit?usp=sharing">
        Conversion Info
    </a>
    <a
       href="/party/{data.party.code}">
        Back to Party
    </a>
    </div>
</div>

<style>

</style>
