<script lang="ts">
    import BeerCumulativeStatistic from "./BeerCumulativeStatistic.svelte";
    import BeerStatistic from "./BeerStatistic.svelte";
    import PromilleStatistic from "./PromilleStatistic.svelte";

    let props = $props();
    let data: any = $state(props.data);

    type Response = {
        [attendee: string]: {
            [hour: string]: number
        }
    };

    function hasHourlyData(summary: Response): boolean {
        return Object.values(summary).some((hours) => Object.keys(hours).length > 0);
    }

    function latestEstimate(hours: Record<string, number>): number {
        const values = Object.values(hours);
        return values.length > 0 ? values[values.length - 1] : 0;
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
    <div class="mt-10">
        <div class="text-xl">Estimated blood alcohol</div>
        <p class="text-sm opacity-80 mb-3">
            A rough estimate in ‰ based on the tracked beers. It is not a measurement and must not be used to decide whether it is safe or legal to drive.
        </p>
        <div class="glasspanel mb-4">
            <table class="table-auto">
                <tbody>
                    {#each Object.entries(data.promilleSummary.estimates) as entry}
                        <tr>
                            <td class="px-1">{entry[0]}:</td>
                            <td class="px-1">{latestEstimate(entry[1] as Record<string, number>).toFixed(2)}‰</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        {#if hasHourlyData(data.promilleSummary.estimates as Response)}
            <PromilleStatistic estimates={data.promilleSummary.estimates} />
        {/if}
        <p class="text-xs opacity-70 mt-2">
            Defaults: {data.promilleSummary.assumptions.bodyWeightKg} kg, {data.promilleSummary.assumptions.beerVolumeMl} ml beer at {(data.promilleSummary.assumptions.beerAlcoholByVolume * 100).toFixed(0)}% ABV, {data.promilleSummary.assumptions.alcoholEliminationPerHour.toFixed(2)}‰ eliminated per hour.
        </p>
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
