import {MetricRating} from "@/constants/metricRating";
import {CrUxMetric} from "@/types/CrUxMetrics";

export type WebMetric = {
    value: number | null,
    rating: MetricRating | null,
    crUx: CrUxMetric | null
    coPilot: string | null
}
