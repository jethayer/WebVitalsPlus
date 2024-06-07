export const RUNTIME_CONTEXT = {
    DEVTOOLS: 'devtools',
    BACKGROUND: 'background',
    POPUP: 'popup',
    OPTIONS: 'options',
    CONTENT_SCRIPT: 'content-script',
    WINDOW: 'window'
} as const;

export type RuntimeContext = typeof RUNTIME_CONTEXT[keyof typeof RUNTIME_CONTEXT];

export const messageTab = (context: RuntimeContext, tabId: string | number) => {
    return `${context}@${tabId}`;
}
