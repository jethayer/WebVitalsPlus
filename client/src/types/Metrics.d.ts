// @ts-ignore

import {WebMetric} from "@/types/WebMetric";
import {NetworkMetric} from "@/types/NetworkMetric";
import {MetricDate} from "crux-api";
import {METRIC_KEY, NetworkMetricKey, WebMetricKey} from "@/constants/metricKey";
import {CrUxMetric, CrUxMetrics} from "@/types/CrUxMetrics";
import {CoPilotSuggestions} from "@/types/CoPilotSuggestions";

export type Metrics = {
        timestamp: number,
        loading: boolean,
        [METRIC_KEY.NETWORK]: NetworkMetric | null,
        [METRIC_KEY.CRUX]: {
            firstDate: MetricDate;
            lastDate: MetricDate;
        } | null
    }
    & Record<WebMetricKey, WebMetric>
    & Record<string, unknown>;
