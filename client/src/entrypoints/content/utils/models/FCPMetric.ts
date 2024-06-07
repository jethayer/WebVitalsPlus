import {AbstractWebMetric} from "@/entrypoints/content/utils/models/AbstractWebMetric";
import {DisplayValueOptions} from "@/types/DisplayValueOptions";

export class FCPMetric extends AbstractWebMetric {

    formatValue(value: number | null) {
        return value ? (value / 1000) : value;
    }

    get displayOptions(): DisplayValueOptions {
        return {
            style: 'unit',
            unit: 'second'
        }
    }
}
