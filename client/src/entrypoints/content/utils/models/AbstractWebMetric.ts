import {WebMetric} from "@/types/WebMetric";
import {NetworkMetric} from "@/types/NetworkMetric";
import {AbstractMetric} from "@/entrypoints/content/utils/models/AbstractMetric";
import {CrUxMetric} from "@/types/CrUxMetrics";
import {DisplayValueOptions} from "@/types/DisplayValueOptions";
import {WebMetricKey} from "@/constants/metricKey";
import {THRESHOLDS} from "@/constants/thresholds";


export abstract class AbstractWebMetric extends AbstractMetric {
    private key: WebMetricKey;

    public constructor(key: WebMetricKey, data: NetworkMetric | WebMetric | null, timestamp: number, old: boolean) {
        super(data, timestamp, old);
        this.key = key;
    }

    protected get data(): WebMetric | null {
        return this._data as WebMetric;
    }

    public get value(): number | null {
        return this.data?.value ?? null;
    }

    public get formattedValue(): number | null {
        return this.formatValue(this.data?.value ?? null);
    }

    public get rating(): string {
        return this.data?.rating ?? 'N/A';
    }

    public get coPilotSuggestion(): string | null {
        return this.data?.coPilot ?? null;
    }

    public getCrUxData(): CrUxMetric | null {
        return this.data?.crUx ?? null;
    }

    public getCrUxPercent(): number {
        const crUxData = this.getCrUxData();
        if (crUxData && this.rating) {
            const ratingData = crUxData[this.rating as keyof CrUxMetric];
            if (ratingData) {
                const totalDensity = Object.values(crUxData).reduce((total, bin) => {
                    return total + (bin ? bin.density : 0);
                }, 0);
                return (ratingData.density / totalDensity) * 100;
            }
        }
        return 0;
    }

    public getThresholds(): { GOOD: number, BAD: number } {
        return {
            GOOD: THRESHOLDS[this.key]?.good ?? 0,
            BAD: THRESHOLDS[this.key]?.bad ?? 0
        }
    }

    public getSimpleThresholds(): { GOOD: number, BAD: number } {
        return {
            GOOD: this.formatValue(THRESHOLDS[this.key]?.good ?? 0) as number,
            BAD: this.formatValue(THRESHOLDS[this.key]?.bad ?? 0) as number
        }
    }

    public buildDisplayValue(value: number | null) {
        if (!value) {
            return 'NA';
        }

        const formattedValue = this.formatValue(value);
        return formattedValue ? formattedValue.toLocaleString(undefined, {
            ...(this.displayOptions ?? {}),
            unitDisplay: 'narrow',
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
        }) : 'NA';
    }

    get displayValue() {
        return this.buildDisplayValue(this.value);
    }

    public abstract formatValue(value: number | null): number | null;

    public abstract get displayOptions(): DisplayValueOptions | null;
}
