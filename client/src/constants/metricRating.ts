export const METRIC_RATING = {
    GOOD: 'good',
    NEEDS_IMPROVEMENT: 'needs-improvement',
    POOR: 'poor',
} as const;

export type MetricRating = typeof METRIC_RATING[keyof typeof METRIC_RATING];
