import {LCPThresholds, FCPThresholds, CLSThresholds, FIDThresholds, INPThresholds, TTFBThresholds} from 'web-vitals';
import {METRIC_KEY, WebMetricKey} from "@/constants/metricKey";

export const THRESHOLDS: Record<WebMetricKey, { good: number, bad: number }> = {
    [METRIC_KEY.CLS]: {good: CLSThresholds[0], bad: CLSThresholds[1]},
    [METRIC_KEY.FCP]: {good: FCPThresholds[0], bad: FCPThresholds[1]},
    [METRIC_KEY.LCP]: {good: LCPThresholds[0], bad: LCPThresholds[1]},
    [METRIC_KEY.FID]: {good: FIDThresholds[0], bad: FIDThresholds[1]},
    [METRIC_KEY.INP]: {good: INPThresholds[0], bad: INPThresholds[1]},
    [METRIC_KEY.TTFB]: {good: TTFBThresholds[0], bad: TTFBThresholds[1]}
} as const;
