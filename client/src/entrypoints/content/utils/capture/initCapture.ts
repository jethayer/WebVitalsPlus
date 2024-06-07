import {
    CO_PILOT_METRIC_KEY,
    CRUX_METRIC_KEY,
    METRIC_KEY,
    NETWORK_METRIC_KEY,
    WEB_METRIC_KEY,
    WebMetricKey
} from "@/constants/metricKey";
import {Metrics} from "@/types/Metrics";
import {captureWebMetrics} from "@/entrypoints/content/utils/capture/captureWebMetrics";
import {captureNetworkMetric} from "@/entrypoints/content/utils/capture/captureNetworkMetric";
import {NetworkMetric} from "@/types/NetworkMetric";
import {WebMetric} from "@/types/WebMetric";
import {captureCrUxMetric} from "@/entrypoints/content/utils/capture/captureCrUxMetric";
import {CrUxMetrics} from "@/types/CrUxMetrics";
import {captureCoPilot} from "@/entrypoints/content/utils/capture/captureCoPilot";
import {CoPilotSuggestions} from "@/types/CoPilotSuggestions";

export const initCapture = async (onCapture: (data: Metrics) => void) => {
    const loading: Record<string, boolean> = {
        [WEB_METRIC_KEY.FCP]: true,
        [WEB_METRIC_KEY.LCP]: true,
        [WEB_METRIC_KEY.CLS]: true,
        [WEB_METRIC_KEY.FID]: true,
        [WEB_METRIC_KEY.INP]: true,
        [WEB_METRIC_KEY.TTFB]: true,
        [NETWORK_METRIC_KEY.NETWORK]: true,
        [CRUX_METRIC_KEY.CRUX]: true,
        [CO_PILOT_METRIC_KEY.CO_PILOT]: true
    }

    const data: Metrics = {
        timestamp: Date.now(),
        loading: true,
        [WEB_METRIC_KEY.FCP]: {value: null, rating: null, crUx: null, coPilot: null},
        [WEB_METRIC_KEY.LCP]: {value: null, rating: null, crUx: null, coPilot: null},
        [WEB_METRIC_KEY.CLS]: {value: null, rating: null, crUx: null, coPilot: null},
        [WEB_METRIC_KEY.FID]: {value: null, rating: null, crUx: null, coPilot: null},
        [WEB_METRIC_KEY.INP]: {value: null, rating: null, crUx: null, coPilot: null},
        [WEB_METRIC_KEY.TTFB]: {value: null, rating: null, crUx: null, coPilot: null},
        [NETWORK_METRIC_KEY.NETWORK]: null,
        [CRUX_METRIC_KEY.CRUX]: null
    }

    function upDateLoading() {
        if (!Object.values(loading).find(value => value)) {
            data.loading = false;
        }
    }


    function logWebMetric(key: WebMetricKey, newMetric: WebMetric) {
        data[key] = {...data[key], ...newMetric};
        loading[key] = false;
        upDateLoading();
        onCapture(data);
    }

    function logNetworkMetric(networkMetric: NetworkMetric) {
        data[METRIC_KEY.NETWORK] = networkMetric;
        loading[METRIC_KEY.NETWORK] = false;
        upDateLoading();
        onCapture(data);
    }

    function logCoPilotSuggestions(coPilotSuggestions: CoPilotSuggestions) {
        data.CLS.coPilot = coPilotSuggestions[METRIC_KEY.CLS];
        data.FCP.coPilot = coPilotSuggestions[METRIC_KEY.FCP];
        data.FID.coPilot = coPilotSuggestions[METRIC_KEY.FID];
        data.LCP.coPilot = coPilotSuggestions[METRIC_KEY.LCP];
        data.INP.coPilot = coPilotSuggestions[METRIC_KEY.INP];
        data.TTFB.coPilot = coPilotSuggestions[METRIC_KEY.TTFB];

        loading[CO_PILOT_METRIC_KEY.CO_PILOT] = false;
        upDateLoading();
        onCapture(data);
    }

    function logCrUxMetric(crUxMetrics: CrUxMetrics) {
        data.CLS.crUx = crUxMetrics[METRIC_KEY.CLS];
        data.FCP.crUx = crUxMetrics[METRIC_KEY.FCP];
        data.FID.crUx = crUxMetrics[METRIC_KEY.FID];
        data.LCP.crUx = crUxMetrics[METRIC_KEY.LCP];
        data.INP.crUx = crUxMetrics[METRIC_KEY.INP];
        data.TTFB.crUx = crUxMetrics[METRIC_KEY.TTFB];

        data[METRIC_KEY.CRUX] = crUxMetrics.collectionPeriod;
        loading[METRIC_KEY.CRUX] = false;
        upDateLoading();
        onCapture(data);
    }

    await new Promise(async (resolve) => {
        setTimeout(() => {
            data.loading = false;
            resolve(data); // fallback timeout
        }, 10000);

        await Promise.all([
            captureNetworkMetric(logNetworkMetric),
            captureWebMetrics(logWebMetric),
            captureCrUxMetric(logCrUxMetric)
        ]);

        // request CoPilot data
        await captureCoPilot({
            CLS: data.CLS.value,
            FCP: data.FCP.value,
            LCP: data.LCP.value,
            TTFB: data.TTFB.value,
            FID: data.FID.value,
            INP: data.INP.value
        }, logCoPilotSuggestions);

        resolve(data);
    });

    onCapture(data); // set init placeholder data
    return data;
}
