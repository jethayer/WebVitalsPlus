import {WEB_METRIC_KEY} from "@/constants/metricKey";

export const ROUTE_KEY = {
    ...WEB_METRIC_KEY
} as const;

export type RouteKey = typeof ROUTE_KEY[keyof typeof ROUTE_KEY];
