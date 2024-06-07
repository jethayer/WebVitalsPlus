import {MESSAGES} from "@/constants/messages";
import {browser} from "wxt/browser";
import {messageTab, RUNTIME_CONTEXT} from "@/constants/runtimeContext";
import {sendMessage, onMessage} from "webext-bridge/background";
import {storage} from "@/utils/storage";
import {isValidTabId} from "@/utils/isValidTabId";
import {isValidTabUrl} from "@/utils/isValidTabUrl";
import {createQueryRecord} from "crux-api";


export default defineBackground(() => {

    const updateTabState = async (tabId: number, newState: boolean) => {
        await browser.action.setIcon({tabId: tabId, path: !newState ? '/icon/48-disabled.png' : '/icon/48.png'});
        await sendMessage(
            MESSAGES.SHOW_UI,
            {tabId, show: newState},
            messageTab(RUNTIME_CONTEXT.CONTENT_SCRIPT, tabId)
        );
    }


    // When the icon is clicked
    browser.action.onClicked?.addListener(async (tab) => {
        if (tab.id && isValidTabUrl(tab)) {
            const currentStatus = await storage.local.get(tab.id, false);
            const newStatus = !currentStatus;
            await storage.local.set<boolean>(tab.id, !currentStatus);
            await updateTabState(tab.id, newStatus);
        }
    });


    browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
        await updateTabState(tabId, false);
        if (changeInfo.status == 'complete' && tab.url && isValidTabUrl(tab)) {
            const currentStatus = await storage.local.get(tabId, false);
            if (currentStatus) {
                await updateTabState(tabId, true);
                await sendMessage(
                    MESSAGES.CAPTURE_VITALS,
                    {},
                    messageTab(RUNTIME_CONTEXT.CONTENT_SCRIPT, tabId)
                );
            }
        }
    });


    // // User has made a new or existing tab visible
    // browser.tabs.onActivated.addListener(async ({tabId, windowId}) => {
    //     console.log('browser.tabs.onActivated');
    //     setTimeout(async () => {  // wait for the tab to be activated
    //         const currentStatus = await storage.local.get(tabId, false);
    //         await storage.local.set<boolean>(tabId, currentStatus);
    //         await updateTabState(tabId, currentStatus);
    //     }, 500);
    //
    //     const currentStatus = await storage.local.get(tabId, false);
    //     if (currentStatus) {
    //         await sendMessage(
    //             MESSAGES.CAPTURE_VITALS,
    //             {},
    //             messageTab(RUNTIME_CONTEXT.CONTENT_SCRIPT, tabId)
    //         );
    //     }
    //
    // });


    // cleanup old tabs from storage
    browser.runtime.onStartup.addListener(async () => {
        const savedTabStates = await storage.local.getAll<boolean>();
        const tabIds = Object.keys(savedTabStates);
        if (tabIds.length > 0) {
            for (const tabId of tabIds) {
                if (!await isValidTabId(parseInt(tabId))) {
                    await storage.local.remove(tabId);
                }
            }
        }
    });


    onMessage(MESSAGES.FETCH_CRUX, async ({data}) => {
        /** fetching from background to keep origin of request that of the extension **/
        try {
            const response = await fetch(`http://127.0.0.1:3001/crux?url=${data.url}&isMobile=${data.isMobile}`, {
                headers: {
                    "Accept": "application/json",
                }
            });
            const cruxData = await response.json();
            return cruxData;
        } catch (e) {
            console.log(e);
        }

        return null;  // This will be sent back to the content script as the response
    });


    onMessage(MESSAGES.FETCH_CO_PILOT_MESSAGE, async ({data}) => {
        /** fetching from background to keep origin of request that of the extension **/
        try {
            console.log('fetch co-pilot', data);
            const response = await fetch("http://127.0.0.1:3001/co-pilot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    CLS: data.CLS,
                    FCP: data.FCP,
                    LCP: data.LCP,
                    TTFB: data.TTFB,
                    FID: data.FID,
                    INP: data.INP
                })
            });
            console.log('fetch co-pilot response', response);


            const responseData = await response.json();
            if (responseData.choices && responseData.choices[0] && responseData.choices[0].message) {
                return responseData.choices[0].message.content.trim();
            }

            return null;
        } catch (e) {
            console.log(e);
        }

        return null;  // This will be sent back to the content script as the response
    });

});
