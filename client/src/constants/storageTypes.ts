// https://developer.chrome.com/docs/extensions/reference/api/storage#storage_areas

export const STORAGE_TYPES = {
    LOCAL: 'local',
    SESSION: 'session',
    SYNC: 'sync',
} as const;

export type StorageType = typeof STORAGE_TYPES[keyof typeof STORAGE_TYPES];
