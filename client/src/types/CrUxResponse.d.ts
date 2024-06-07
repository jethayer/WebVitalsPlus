export type CrUxResponseFormFactor = 'ALL_FORM_FACTORS' | 'PHONE' | 'DESKTOP' | 'TABLET';
export type CrUxResponseConnection = '4G' | '3G' | '2G' | 'slow-2G' | 'offline';
export type CrUxResponseMetricValue = {
    histogram: {
        start: number | string;
        end: number | string;
        density: number;
    }[];
    percentiles: {
        p75: number | string;
    };
};
export type CrUxResponseMetricDate = {
    year: number;
    month: number;
    day: number;
};
export type CrUxResponseCollectionPeriod = {
    firstDate: CrUxResponseMetricDate;
    lastDate: CrUxResponseMetricDate;
};
export type CrUxResponse = {
    record: {
        key: {
            url?: string;
            origin?: string;
            effectiveConnectionType?: CrUxResponseConnection;
            formFactor?: CrUxResponseFormFactor;
        };
        metrics: {
            first_contentful_paint?: CrUxResponseMetricValue;
            largest_contentful_paint?: CrUxResponseMetricValue;
            first_input_delay?: CrUxResponseMetricValue;
            cumulative_layout_shift?: CrUxResponseMetricValue;
            interaction_to_next_paint?: CrUxResponseMetricValue;
            experimental_time_to_first_byte?: CrUxResponseMetricValue;
        };
        collectionPeriod: CrUxResponseCollectionPeriod;
    };
    urlNormalizationDetails?: {
        originalUrl: string;
        normalizedUrl: string;
    };
};
