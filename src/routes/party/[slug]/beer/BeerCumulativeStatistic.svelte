<script lang="ts">
    import { Chart, type ChartConfiguration, type ChartDataset, registerables } from "chart.js";
    import "chartjs-adapter-date-fns";
    import { onDestroy, onMount } from "svelte";
    import { colorForAttendee } from "./chartColors";

    let canvas: HTMLCanvasElement | null = null;
    let chart: Chart | null = null;
    let { beerCumulativeSummary } = $props() as { beerCumulativeSummary: Response };

    type Response = Record<string, Record<string, number>>;

    type DataEntry = {
        x: Date,
        y: number
    };

    function toChartJSData(response: Response): ChartDataset<"line">[] {
        const attendees = Object.keys(response);
        return Object.entries(response).map(([attendee, hours]) => {
            const color = colorForAttendee(attendee, attendees);
            return {
                label: attendee,
                data: Object.entries(hours).map(([hour, beerCount]) => {
                    return {
                        x: new Date(hour),
                        y: beerCount
                    } satisfies DataEntry;
                }),
                parsing: false,
                borderColor: color,
                backgroundColor: color,
                pointRadius: 3,
                pointHoverRadius: 4,
                pointBorderWidth: 0,
                tension: 0,
                fill: false
            };
        });
    }

    function allHours(response: Response): string[] {
        return Object.values(response).flatMap((hours) => Object.keys(hours));
    }

    function min(response: Response) {
        return allHours(response).sort()[0];
    }

    function max(response: Response) {
        const hours = allHours(response).sort();
        return hours[hours.length - 1];
    }

    onMount(() => {
        Chart.register(...registerables);

        if (!canvas) {
            return;
        }

        const config: ChartConfiguration<"line"> = {
            type: "line",
            data: {
                datasets: toChartJSData(beerCumulativeSummary)
            },
            options: {
                animation: false,
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    x: {
                        type: "time",
                        time: {
                            displayFormats: {
                                hour: "EEE HH:mm"
                            },
                            unit: "hour"
                        },
                        min: min(beerCumulativeSummary),
                        max: max(beerCumulativeSummary)
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                }
            }
        };

        chart = new Chart(canvas.getContext("2d")!, config);
    });

    onDestroy(() => {
        chart?.destroy();
    });
</script>

<div class="chart">
    <canvas bind:this={canvas}></canvas>
</div>

<style>
    .chart {
        height: 24rem;
    }
</style>
