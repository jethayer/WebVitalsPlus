import {WebMetric} from "@/types/WebMetric";
import {NetworkMetric} from "@/types/NetworkMetric";

export abstract class AbstractMetric {
    protected _data: NetworkMetric | WebMetric | null;
    private _timestamp: number;
    private _old: boolean;

    public constructor(data: NetworkMetric | WebMetric | null, timestamp: number, old: boolean) {
        this._data = data;
        this._timestamp = timestamp;
        this._old = old;
    }

    protected get data(): NetworkMetric | WebMetric | null {
        return this._data;
    }

    public get timestamp(): number {
        return this._timestamp;
    }

    public get old(): boolean {
        return this._old;
    }

    public abstract get displayValue(): string
}
