import {storage as wxtStorage} from 'wxt/storage';
import {STORAGE_TYPES, StorageType} from "@/constants/storageTypes";

const getAll = (storageType: StorageType) => async function <R = any>() {
    return await wxtStorage.snapshot(storageType) as Record<string, R>;
}

const get = (storageType: StorageType) => async function <R = any>(key: string | number | undefined, defaultValue: R) {
    const result = await wxtStorage.getItem<R>(`${storageType}:${key}`);

    if (!result) {
        await set(storageType)(key, defaultValue);
        return defaultValue;
    }

    return result;
}

const set = (storageType: StorageType) => async function <R>(key: string | number | undefined, value: R) {
    if (key) {
        return await wxtStorage.setItem<R>(`${storageType}:${key}`, value)
    }
    return;
}

const remove = (storageType: StorageType) => async function (key: string | number | undefined) {
    if (key) {
        return await wxtStorage.removeItem(`${storageType}:${key}`);
    }
    return;
}

const watch = (storageType: StorageType) => async function <R>(key: string | number | undefined, callback: (newValue: R | null, oldValue: R | null) => void) {
    return wxtStorage.watch<R>(`${storageType}:${key}`, callback);
}


export const storage = {
    // used to store what tabs have the plugin activated
    local: {
        getAll: getAll(STORAGE_TYPES.LOCAL),
        get: get(STORAGE_TYPES.LOCAL),
        set: set(STORAGE_TYPES.LOCAL),
        remove: remove(STORAGE_TYPES.LOCAL),
        watch: watch(STORAGE_TYPES.LOCAL),
    },
    // used to store the websites vital-history
    sync: {
        getAll: getAll(STORAGE_TYPES.SYNC),
        get: get(STORAGE_TYPES.SYNC),
        set: set(STORAGE_TYPES.SYNC),
        remove: remove(STORAGE_TYPES.SYNC),
        watch: watch(STORAGE_TYPES.SYNC),
    }
}
