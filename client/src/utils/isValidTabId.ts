import {browser} from "wxt/browser";

export const isValidTabId = async (tabId: number) => {
    try {
        await browser.tabs.get(tabId);
        return true;
    } catch (e) {
        return false;
    }
}
