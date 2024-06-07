import {Metrics} from "@/types/Metrics";

type Timestamp = string;

export type ChromeMetricsStorage = Record<Timestamp, Metrics>;
