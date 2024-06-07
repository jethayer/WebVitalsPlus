import {NetworkMetricKey, WebMetricKey} from "./metricKey";

export type MetricKeyDetail = {
    fullName: string;
    description: string;
}

export const METRIC_DETAILS: Record<WebMetricKey | NetworkMetricKey, MetricKeyDetail> = {
    FCP: {
        fullName: "First Contentful Paint",
        description: "Time when first content appears on the screen."
    },
    LCP: {
        fullName: "Largest Contentful Paint",
        description: "Time when first content appears on the screen."
    },
    CLS: {
        fullName: "Cumulative Layout Shift",
        description: "Measures unexpected layout shifts during page load."
    },
    FID: {
        fullName: "First Input Delay",
        description: "Measures responsiveness to user inputs."
    },
    INP: {
        fullName: "Interaction to next Paint",
        description: "Time between user interaction and subsequent visual change."
    },
    TTFB: {
        fullName: "Time to First Byte",
        description: "Time for the first byte of content to be received."
    },
    NETWORK: {
        fullName: "Network Response Times",
        description: "Metrics related to network performance."
    }
}
