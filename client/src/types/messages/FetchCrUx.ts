import {CrUxResponse} from "@/types/CrUxResponse";

export type FetchCrUxResponse = CrUxResponse | null;

export type FetchCrUxRequest = {
    url: string;
    isMobile: boolean
};
