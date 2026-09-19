<script lang="ts">
    import { Chart, type ChartConfiguration, type ChartDataset, registerables } from "chart.js";
    import "chartjs-adapter-date-fns";
    import { onDestroy, onMount } from "svelte";
    import { colorForAttendee } from "./chartColors";

    type Response = Record<string, Record<string, number>>;
    type DataEntry = { x: number, y: number };

    let canvas: HTMLCanvasElement | null = null;
    let chart: Chart | null = null;
    let { estimates } = $props() as { estimates: Response };

    function allHours(response: Response): string[] {
        return Object.values(response).flatMap((hours) => Object.keys(hours));
    }

    function toChartJSData(response: Response): ChartDataset<"line">[] {
        const attendees = Object.keys(response);
        return Object.entries(response).map(([attendee, hours]) => {
            const color = colorForAttendee(attendee, attendees);
            return {
                label: attendee,
                data: Object.entries(hours).map(([hour, promille]) => ({
                    x: new Date(hour).getTime(),
                    y: promille
                } satisfies DataEntry)),
                parsing: false,
                borderColor: color,
                backgroundColor: color,
                pointRadius: 3,
                pointHoverRadius: 4,
                pointBorderWidth: 0,
                tension: 0.2,
                fill: false
            };
        });
    }

    onMount(() => {
        Chart.register(...registerables);
        if (!canvas) return;

        const hours = allHours(estimates).sort();
        const config: ChartConfiguration<"line"> = {
            type: "line",
            data: { datasets: toChartJSData(estimates) },
            options: {
                animation: false,
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true } },
                scales: {
                    x: {
                        type: "time",
                        time: { displayFormats: { hour: "EEE HH:mm" }, unit: "hour" },
                        min: hours[0],
                        max: hours[hours.length - 1]
                    },
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: "Estimated ‰" }
                    }
                }
            }
        };
        chart = new Chart(canvas.getContext("2d")!, config);
    });

    onDestroy(() => chart?.destroy());
</script>

<div class="chart">
    <canvas bind:this={canvas}></canvas>
</div>

<style>
    .chart { height: 24rem; }
</style>
