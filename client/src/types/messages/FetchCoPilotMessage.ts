export type FetchCoPilotMessageResponse = string;

export type FetchCoPilotMessageRequest = {
    CLS: number | null;
    FCP: number | null;
    LCP: number | null;
    TTFB: number | null;
    FID: number | null;
    INP: number | null;
};
