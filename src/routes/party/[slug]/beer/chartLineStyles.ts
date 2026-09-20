import type { PointStyle } from "chart.js";

export const chartLineStyles: Array<{
    borderDash: number[];
    pointStyle: PointStyle;
    pointRadius: number;
    pointHoverRadius: number;
    borderWidth: number;
}> = [
    { borderDash: [], pointStyle: "circle", pointRadius: 3, pointHoverRadius: 5, borderWidth: 2 },
    { borderDash: [7, 4], pointStyle: "rectRot", pointRadius: 4, pointHoverRadius: 6, borderWidth: 2 },
    { borderDash: [2, 4], pointStyle: "triangle", pointRadius: 4, pointHoverRadius: 6, borderWidth: 2 },
    { borderDash: [10, 4, 2, 4], pointStyle: "star", pointRadius: 4, pointHoverRadius: 6, borderWidth: 2 }
];
