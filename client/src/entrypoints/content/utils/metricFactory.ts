import {WebMetric} from "@/types/WebMetric";
import {METRIC_KEY, WEB_METRIC_KEY, WebMetricKey} from "@/constants/metricKey";
import {LCPMetric} from "@/entrypoints/content/utils/models/LCPMetric";
import {FIDMetric} from "@/entrypoints/content/utils/models/FIDMetric";
import {CLSMetric} from "@/entrypoints/content/utils/models/CLSMetric";
import {INPMetric} from "@/entrypoints/content/utils/models/INPMetric";
import {FCPMetric} from "@/entrypoints/content/utils/models/FCPMetric";
import {TTFBMetric} from "@/entrypoints/content/utils/models/TTFBMetric";
import {NetworkMetric} from "@/entrypoints/content/utils/models/NetworkMetric";

export const metricFactory = (metricKey: WebMetricKey, data: WebMetric | NetworkMetric | null, timestamp: number, old: boolean) => {
    switch (metricKey) {
        case METRIC_KEY.LCP:
            return new LCPMetric(WEB_METRIC_KEY.LCP, data as WebMetric, timestamp, old);
        case METRIC_KEY.FID:
            return new FIDMetric(WEB_METRIC_KEY.FID, data as WebMetric, timestamp, old);
        case METRIC_KEY.CLS:
            return new CLSMetric(WEB_METRIC_KEY.CLS, data as WebMetric, timestamp, old);
        case METRIC_KEY.INP:
            return new INPMetric(WEB_METRIC_KEY.INP, data as WebMetric, timestamp, old);
        case METRIC_KEY.FCP:
            return new FCPMetric(WEB_METRIC_KEY.FCP, data as WebMetric, timestamp, old);
        case METRIC_KEY.TTFB:
            return new TTFBMetric(WEB_METRIC_KEY.TTFB, data as WebMetric, timestamp, old);
        default:
            throw new Error(`Unknown metric key: ${metricKey}`);
    }
}
