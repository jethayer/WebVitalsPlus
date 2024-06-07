import {Tabs} from "webextension-polyfill";
import Tab = Tabs.Tab;

export const isValidTabUrl = (tab: Tab) => {
    return tab?.url?.startsWith('http') ?? false;
}
