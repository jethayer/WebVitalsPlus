import {MetricRating} from "@/constants/metricRating";
import {CrUxHistogramData} from "@/types/CrUxHistogramData";
import {METRIC_KEY} from "@/constants/metricKey";
import {CollectionPeriod} from "crux-api";

export type CrUxMetric = Record<MetricRating, CrUxHistogramData | null>

export type CrUxMetrics = {
    collectionPeriod: CollectionPeriod,
    [METRIC_KEY.FCP]: CrUxMetric,
    [METRIC_KEY.LCP]: CrUxMetric,
    [METRIC_KEY.CLS]: CrUxMetric,
    [METRIC_KEY.FID]: CrUxMetric,
    [METRIC_KEY.INP]: CrUxMetric,
    [METRIC_KEY.TTFB]: CrUxMetric,
};
