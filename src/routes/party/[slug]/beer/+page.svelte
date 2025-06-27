<script lang="ts">
    export let data;
    import { onMount, onDestroy } from "svelte";
    import { Chart, registerables } from "chart.js";
    import type { ChartConfiguration } from "chart.js"; // ✅ Import type only!
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
</script>

<div class="beer">
    <form action="?/addBeer" method="post" class="beer-for">
        <button type="submit">
            <img src="/beer.png" alt="asdf" />
        </button>
    </form>
    <hr />
    <div>
        Beer Count: {data.party.beerCount}
        <a
            href="https://docs.google.com/spreadsheets/d/1VihgGCWKcQha8KXcgX4ZaPFwsEz-SZUs_db7xZAE8LI/edit?usp=sharing"
            >?</a
        >
    </div>
    <hr />
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

<div class="date-picker">
    <label>
        <input type="date" bind:value={startDateText} on:change={change} />
    </label>

    <label>
        <input
            type="date"
            bind:value={endDateText}
            min={startDateText}
            on:change={change}
        />
    </label>
</div>

<canvas bind:this={canvas} width="400" height="200"></canvas>

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
