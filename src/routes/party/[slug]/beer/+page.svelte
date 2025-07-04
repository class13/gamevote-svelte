<script lang="ts">
    let props = $props()
    let data = $state(props.data)
    import { onMount, onDestroy } from "svelte";
    import { Chart, registerables } from "chart.js";
    import type { ChartConfiguration } from "chart.js"; // ✅ Import type only!
    import BeerStatistic from "./BeerStatistic.svelte";

    import "chartjs-adapter-date-fns";
    let canvas: HTMLCanvasElement | null = null;
    let chart: Chart | null = null;
    let startDate: Date = new Date();
    startDate.setHours(0, 0);
    let endDate: Date = new Date();

    endDate.setHours(23, 59);
    let startDateText = startDate.toISOString().split("T")[0];

    let endDateText = endDate.toISOString().split("T")[0];

    function transformData(
        data: Record<string, string[]>,
    ): { person: string; points: { x: string; y: number }[] }[] {
        return Object.entries(data).map(([person, timestamps]) => {
            const countMap = new Map<string, number>();
            for (const ts of timestamps) {
                const date = new Date(ts);
                if (date >= startDate && date <= endDate) {
                    countMap.set(ts, (countMap.get(ts) || 0) + 1);
                }
            }
            const sorted = Array.from(countMap.entries()).sort((a, b) =>
                a[0].localeCompare(b[0]),
            );

            let cumulative = 0;
            const points = sorted.map(([x, y]) => {
                cumulative += y;
                return { x, y: cumulative };
            });
            return { person, points };
        });
    }

    type Response = {
        [attendee: string]: {
            [hour: string]: number
        }
    }

    function setupChart(chartData: any) {
        Chart.register(...registerables);
        if (canvas) {
            const config: ChartConfiguration<"line"> = {
                type: "line",
                data: {
                    datasets: chartData.map((personData: any) => ({
                        label: personData.person,
                        data: personData.points,
                        borderColor: randomColor(),
                        backgroundColor: "transparent",
                        fill: false,
                        tension: 0.9,
                    })),
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "Beer Drinking Chart",
                        },
                    },
                    scales: {
                        x: {
                            type: "timeseries",
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            };

            chart = new Chart(canvas.getContext("2d")!, config);
        }

        let showChart = $state(new Set(Object.values(data.beerSummary as Response).flatMap((it) => {return Object.keys(it)})).size > 1)
    }

    function updateChart(chartData: any) {
        if (chart) {
            chart.data.datasets = chartData.map((personData: any) => ({
                label: personData.person,
                data: personData.points,
                borderColor: randomColor(),
                backgroundColor: "transparent",
                fill: false,
                tension: 0.9,
            }));
            chart.update();
        }
    }

    onMount(() => {
        const chartData = transformData(data.party.beerChartData);
        setupChart(chartData);
    });
    function change() {
        startDate = new Date(startDateText);
        endDate = new Date(endDateText);
        startDate.setHours(0, 0);
        endDate.setHours(23, 59);
        const chartData = transformData(data.party.beerChartData);
        updateChart(chartData);
    }

    onDestroy(() => {
        chart?.destroy();
    });
    // Simple random color generator for datasets

    function randomColor(): string {
        return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
    }

    let hours = new Set(Object.values(data.beerSummary as Response).flatMap(it => Object.keys(it)))
    let showChart = $state(
        hours.size > 1
    )
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
    {#if showChart}
    <div>
        <div class="text-xl">Chart</div>
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