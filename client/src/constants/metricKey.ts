export const WEB_METRIC_KEY = {
    FCP: 'FCP',
    LCP: 'LCP',
    CLS: 'CLS',
    FID: 'FID',
    INP: 'INP',
    TTFB: 'TTFB'
} as const;

export const NETWORK_METRIC_KEY = {
    NETWORK: 'NETWORK',
} as const;

export const CRUX_METRIC_KEY = {
    CRUX: 'CRUX'
} as const;

export const CO_PILOT_METRIC_KEY = {
    CO_PILOT: 'CO_PILOT'
} as const;

export const METRIC_KEY = {
    ...WEB_METRIC_KEY,
    ...NETWORK_METRIC_KEY,
    ...CRUX_METRIC_KEY,
    ...CO_PILOT_METRIC_KEY
} as const;

type MetricKey = typeof METRIC_KEY[keyof typeof METRIC_KEY];

export type WebMetricKey = Exclude<MetricKey, typeof METRIC_KEY.NETWORK | typeof METRIC_KEY.CRUX | typeof METRIC_KEY.CO_PILOT>;

export type NetworkMetricKey = Extract<MetricKey, typeof METRIC_KEY.NETWORK>;

export type CoPilotMetricKey = Extract<MetricKey, typeof METRIC_KEY.CO_PILOT>;

