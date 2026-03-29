<script lang="ts">
    import BeerCumulativeStatistic from "./BeerCumulativeStatistic.svelte";
    import BeerStatistic from "./BeerStatistic.svelte";

    let props = $props();
    let data = $state(props.data);

    type Response = {
        [attendee: string]: {
            [hour: string]: number
        }
    };

    function hasHourlyData(summary: Response): boolean {
        return Object.values(summary).some((hours) => Object.keys(hours).length > 0);
    }
</script>

<div class="">
    <form action="?/addBeer" method="post" class="flex justify-center py-10">
        <div></div>
        <button type="submit" class="bg-neutral-600 hover:bg-neutral-700 rounded-xl p-2 px-5 text-7xl ring shadow-xl/30 hover:shadow-xl/10">
            {data.party.beerCount}🍺
        </button>
    </form>
    <div class="text-xl">Scores</div>
    <div class="glasspanel flex justify-center mb-10">
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
    {#if hasHourlyData(data.beerCumulativeSummary as Response)}
    <div class="mt-10">
        <div class="text-xl">Cumulative Consumption</div>
        <BeerCumulativeStatistic beerCumulativeSummary={data.beerCumulativeSummary} />
    </div>
    {/if}
    {#if hasHourlyData(data.beerSummary as Response)}
    <div>
        <div class="text-xl">Hourly Consumption</div>
        <BeerStatistic beerSummary={data.beerSummary} />
    </div>
    {/if}
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
    .beer {
        height: 90vh;
    }
    .beer-for {
        display: flex;
        justify-content: center;
        height: 40%;
    }
    .beer-rankings {
        height: 40%;
        margin-bottom: 2em;
    }
    .beer-for img {
        width: 100%;
        height: 100%;
    }
    .beer-for button {
        flex-grow: 1;
    }
    .date-picker {
        display: flex;
        justify-content: center;
    }
    .date-picker input {
        font-size: 1.3rem;
    }
    hr {
        border-color: black;
        margin-top: 1em;
        margin-bottom: 1em;
    }
</style>
