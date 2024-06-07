import {sendMessage} from "webext-bridge/content-script";
import {MESSAGES} from "@/constants/messages";
import {FetchCoPilotMessageRequest} from "@/types/messages/FetchCoPilotMessage";
import {CoPilotSuggestions} from "@/types/CoPilotSuggestions";


export const captureCoPilot = async (dataToSend: FetchCoPilotMessageRequest, onCapture: (data: CoPilotSuggestions) => void) => {

    console.log("Captured metrics data:", dataToSend);

    const coPilotResponse = await sendMessage(
        MESSAGES.FETCH_CO_PILOT_MESSAGE,
        dataToSend,
        "background"
    );


    if (coPilotResponse) {
        try {
            onCapture(JSON.parse(coPilotResponse) as CoPilotSuggestions);
        } catch (e) {
            onCapture({
                CLS: null,
                FCP: null,
                FID: null,
                INP: null,
                LCP: null,
                TTFB: null
            });
        }
        return coPilotResponse;
    }

    return null;
}
