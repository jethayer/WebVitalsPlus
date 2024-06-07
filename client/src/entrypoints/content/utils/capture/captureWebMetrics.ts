import {
    CLSMetricWithAttribution,
    FCPMetricWithAttribution,
    FIDMetricWithAttribution, INPMetricWithAttribution,
    LCPMetricWithAttribution, TTFBMetricWithAttribution
} from "web-vitals";
import {METRIC_KEY, WEB_METRIC_KEY, WebMetricKey} from "@/constants/metricKey";
import {onCLS, onFCP, onFID, onINP, onLCP, onTTFB} from "web-vitals/attribution";
import {WebMetric} from "@/types/WebMetric";

type PromiseResponse = Record<WebMetricKey, WebMetric | null>;

export const captureWebMetrics = (onCapture: (key: WebMetricKey, data: WebMetric) => void) => {
    return new Promise<PromiseResponse>((resolve) => {
        const cachedData: PromiseResponse = {
            [WEB_METRIC_KEY.FCP]: null,
            [WEB_METRIC_KEY.LCP]: null,
            [WEB_METRIC_KEY.CLS]: null,
            [WEB_METRIC_KEY.FID]: null,
            [WEB_METRIC_KEY.INP]: null,
            [WEB_METRIC_KEY.TTFB]: null
        }

        const handleCapture = (key: WebMetricKey) => (data: FCPMetricWithAttribution | LCPMetricWithAttribution | CLSMetricWithAttribution | FIDMetricWithAttribution | INPMetricWithAttribution | TTFBMetricWithAttribution) => {
            const capturedData = {
                value: data.value,
                rating: data.rating
            } as WebMetric;

            cachedData[key] = capturedData;
            onCapture(key, capturedData);

            if (!Object.values(cachedData).find(value => value === null)) {
                resolve(cachedData);
            }
        }

        onFCP(handleCapture(WEB_METRIC_KEY.FCP));
        onLCP(handleCapture(WEB_METRIC_KEY.LCP));
        onCLS(handleCapture(WEB_METRIC_KEY.CLS), {reportAllChanges: true});
        onFID(handleCapture(WEB_METRIC_KEY.FID));
        onINP(handleCapture(WEB_METRIC_KEY.INP));
        onTTFB(handleCapture(WEB_METRIC_KEY.TTFB));

        setTimeout(() => {
            resolve(cachedData);
        }, 2000);
    });
}
