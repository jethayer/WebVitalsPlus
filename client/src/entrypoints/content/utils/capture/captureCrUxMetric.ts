import {sendMessage} from "webext-bridge/content-script";
import {MetricValue} from "crux-api";
import {MESSAGES} from "@/constants/messages";
import {isMobile} from "@/entrypoints/content/utils/isMobile";
import {METRIC_KEY} from "@/constants/metricKey";
import {METRIC_RATING, MetricRating} from "@/constants/metricRating";
import {CrUxHistogramData} from "@/types/CrUxHistogramData";
import {CrUxMetrics} from "@/types/CrUxMetrics";


export const captureCrUxMetric = async (onCapture: (data: CrUxMetrics) => void) => {
    const normalizeData = (metric?: MetricValue): Record<MetricRating, CrUxHistogramData | null> => {
        const defaultData: Record<MetricRating, CrUxHistogramData | null> = {
            [METRIC_RATING.GOOD]: null,
            [METRIC_RATING.NEEDS_IMPROVEMENT]: null,
            [METRIC_RATING.POOR]: null
        };

        if (!metric) {
            return defaultData
        }

        return metric.histogram.reduce((acc, histogramData) => {
            if (histogramData.start === 0) {
                return {
                    ...acc,
                    [METRIC_RATING.GOOD]: histogramData
                }
            }

            if (!!histogramData.end) {
                return {
                    ...acc,
                    [METRIC_RATING.NEEDS_IMPROVEMENT]: histogramData
                }
            }

            return {
                ...acc,
                [METRIC_RATING.POOR]: histogramData
            }
        }, defaultData);
    }

    const crUxData = await sendMessage(
        MESSAGES.FETCH_CRUX,
        {url: window.location.href, isMobile: isMobile()},
        "background"
    );

    if (crUxData) {
        const captureData = {
            collectionPeriod: crUxData.record.collectionPeriod,
            [METRIC_KEY.CLS]: normalizeData(crUxData.record.metrics.cumulative_layout_shift),
            [METRIC_KEY.FCP]: normalizeData(crUxData.record.metrics.first_contentful_paint),
            [METRIC_KEY.FID]: normalizeData(crUxData.record.metrics.first_input_delay),
            [METRIC_KEY.LCP]: normalizeData(crUxData.record.metrics.largest_contentful_paint),
            [METRIC_KEY.INP]: normalizeData(crUxData.record.metrics.interaction_to_next_paint),
            [METRIC_KEY.TTFB]: normalizeData(crUxData.record.metrics.experimental_time_to_first_byte)
        }

        onCapture(captureData);
        return captureData;
    }

    return null;
}
