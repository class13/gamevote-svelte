<script lang="ts">
    import {Chart, type ChartConfiguration, type ChartDataset, registerables} from "chart.js";
    import 'chartjs-adapter-date-fns';
    import { onMount } from 'svelte';


    let canvas: HTMLCanvasElement | null = null;
    let chart: Chart | null = null;
    let { partyId, beerSummary } = $props() as { partyId: number, beerSummary: Response }

    type Response = {
        [attendee: string]: {
            [hour: string]: number
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

    function min(response: Response) {
        let dates = Object.entries(response).flatMap(it => Object.keys(it[1]))
        return dates.sort()[0]
    }

    function max(response: Response) {
        let dates = Object.entries(response).flatMap(it => Object.keys(it[1]))
        return dates.sort()[dates.length - 1]
    }

    onMount(() => {
        Chart.register(...registerables);

        if (canvas) {

            const config: ChartConfiguration<'bar'> = {
                type: 'bar',
                data: {
                    datasets: toChartJSData(beerSummary)
                },
                options: {
                    animation: false,
                    scales: {
                        x: {
                            type: 'time',
                            stacked: true,
                            time: {
                                displayFormats: {
                                    hour: 'EEE HH:mm'
                                },
                                unit: 'hour'
                            },
                            min: min(beerSummary),
                            max: max(beerSummary)
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
