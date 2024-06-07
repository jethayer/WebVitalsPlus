import {AbstractMetric} from "./AbstractMetric";
import {NetworkMetric as NetworkMetricType} from "@/types/NetworkMetric";


export class NetworkMetric extends AbstractMetric {

    protected get data(): NetworkMetricType | null {
        return this._data as NetworkMetricType;
    }

    public get value(): string | null {
        //TODO: Implement this
        return 'NA';
    }

    get displayValue() {
        if (!this.value) {
            return 'NA';
        }

        //TODO: Implement this
        return 'NA';
    }
}
