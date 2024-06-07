import {AbstractWebMetric} from "@/entrypoints/content/utils/models/AbstractWebMetric";
import {DisplayValueOptions} from "@/types/DisplayValueOptions";

export class FIDMetric extends AbstractWebMetric {

    formatValue(value: number | null) {
        return value;
    }

    get displayOptions(): DisplayValueOptions {
        return {
            unit: 'millisecond'
        }
    }

}
