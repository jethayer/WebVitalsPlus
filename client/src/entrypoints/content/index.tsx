import React from 'react';
import ReactDOM from 'react-dom/client';
import {Main} from './Main';
import './style.css';
import {onMessage} from "webext-bridge/content-script";
import {MESSAGES} from "@/constants/messages";
import {Metrics} from "@/types/Metrics";
import {storage} from "@/utils/storage";
import {initCapture} from "@/entrypoints/content/utils/capture/initCapture";
import {ChromeMetricsStorage} from "@/types/ChromeMetricsStorage";
import {getCurrentUrl} from "@/entrypoints/content/utils/getCurrentUrl";

export default defineContentScript({
    matches: ['<all_urls>'],
    cssInjectionMode: 'ui',
    async main(ctx) {
        try {
            console.log(getCurrentUrl());
            const currentUrl = getCurrentUrl();
            const originalPadding = document.body.style.paddingTop;
            const ui = await createShadowRootUi(ctx, {
                name: 'web-vitals-plus',
                position: 'inline',
                anchor: "body",
                append: "first",
                onMount: (container, shadow, shadowHost) => {
                    const root = ReactDOM.createRoot(container);

                    root.render(<Main container={shadow.firstChild ?? container}/>);
                    document.body.style.paddingTop = '50px';
                    ui.mounted = root;
                    return root;
                },
                onRemove: (root) => {
                    document.body.style.paddingTop = originalPadding;
                    root?.unmount();
                    ui.mounted = undefined;
                },
            });


            let tempStorage: Metrics; // we use a temp storage so we only save the data when the user opens the UI
            const saveCapturedVitals = async () => {
                const oldStats = await storage.sync.get<ChromeMetricsStorage>(currentUrl, {});
                await storage.sync.set<ChromeMetricsStorage>(currentUrl, {
                    ...oldStats,
                    [tempStorage.timestamp]: tempStorage
                });
            }

            const onCapture = (data: Metrics) => {
                tempStorage = data;
                if (ui.mounted) {
                    saveCapturedVitals();
                }
            }

            onMessage(MESSAGES.SHOW_UI, async ({data}) => {
                if (data.show) {
                    ui.mount();
                    saveCapturedVitals();
                } else {
                    ui.remove();
                }

                return;  // This will be sent back to the content script as the response
            });

            await initCapture(onCapture);
        } catch (e) {

        }
    },
});
