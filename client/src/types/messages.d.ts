import {ProtocolWithReturn} from "webext-bridge";
import {MESSAGES} from "@/constants/messages";
import {ShowUIRequest, ShowUIResponse} from "@/types/messages/ShowUI";
import {CaptureVitalsRequest, CaptureVitalsResponse} from "@/types/messages/CaptureVitals";
import {FetchCrUxRequest, FetchCrUxResponse} from "@/types/messages/FetchCrUx";
import {FetchCoPilotMessageRequest, FetchCoPilotMessageResponse} from "@/types/messages/FetchCoPilotMessage";

declare module "webext-bridge" {
    export interface ProtocolMap {
        [MESSAGES.SHOW_UI]: ProtocolWithReturn<ShowUIRequest, ShowUIResponse>;
        [MESSAGES.CAPTURE_VITALS]: ProtocolWithReturn<CaptureVitalsRequest, CaptureVitalsResponse>;
        [MESSAGES.FETCH_CRUX]: ProtocolWithReturn<FetchCrUxRequest, FetchCrUxResponse>;
        [MESSAGES.FETCH_CO_PILOT_MESSAGE]: ProtocolWithReturn<FetchCoPilotMessageRequest, FetchCoPilotMessageResponse>;
    }
}
