import {AbstractWebMetric} from "@/entrypoints/content/utils/models/AbstractWebMetric";

export class CLSMetric extends AbstractWebMetric {

    formatValue(value: number | null) {
        return value;
    }

    get displayOptions() {
        return null
    }
}
