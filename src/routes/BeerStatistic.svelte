<script lang="ts">
    import {Chart, type ChartConfiguration, type ChartDataset, registerables} from "chart.js";
    import 'chartjs-adapter-date-fns';
    import { onMount } from 'svelte';

    let canvas: HTMLCanvasElement | null = null;
    let chart: Chart | null = null;
    let { partyId } = $props() as { partyId: number }

    type Response = {
        [attendee: string]: {
            [hour: string]: number
        }
    }

    // todo: fetch from api
    // todo: develop api
    let sampleResponse: Response = {
        "lukas": {
            "2025-07-01T08:00": 2,
            "2025-07-01T14:00": 2
        },
        "dominik": {
            "2025-07-01T14:00": 13
        }
    }

    type DataEntry = {
        x: Date,
        y: number
    }


    function toChartJSData(response: Response): ChartDataset<"bar">[] {
        let datasets: ChartDataset[] = []
        for (let [attendee, hours] of Object.entries(response)) {
            let dataEntries = Object.entries(hours).map(([hour, beerCount]) => {
                return {
                    x: new Date(hour),
                    y: beerCount
                } as DataEntry
            })
            let dataset: ChartDataset = {
                label: attendee,
                data: dataEntries,
                // todo: dynamic background color
                parsing: false,
                barPercentage: .4
            }
            datasets.push(
                dataset
            )
        }
        return datasets
    }

    onMount(() => {
        Chart.register(...registerables);

        if (canvas) {

            const config: ChartConfiguration<'bar'> = {
                type: 'bar',
                data: {
                    datasets: toChartJSData(sampleResponse)
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            min: new Date("2025-07-01T07:00"),  // ⬅️ ensure visible range
                            max: new Date("2025-07-03T13:00"),
                            stacked: true
                        },
                        y: {
                            beginAtZero: true,
                            stacked: true
                        }
                    }
                }
            };

            chart = new Chart(canvas.getContext("2d")!, config);
        }
    });
</script>

<canvas bind:this={canvas} width="600" height="400"></canvas>
