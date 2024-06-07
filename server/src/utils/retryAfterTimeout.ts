import {delay} from "./delay";

const MAX_RETRIES = 10
const MAX_TIMEOUT = 60 * 1000 // 60s

export const retryAfterTimeout = async (retryCounter: number, request: any) => {
    if (retryCounter <= MAX_RETRIES) {
        await delay(Math.floor(Math.random() * MAX_TIMEOUT) + 1);
        return request();
    }

    throw new Error('Max retries');
}
