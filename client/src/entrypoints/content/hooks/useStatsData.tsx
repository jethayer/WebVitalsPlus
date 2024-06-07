import {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {Metrics} from "@/types/Metrics";
import {storage} from "@/utils/storage";
import {ChromeMetricsStorage} from "@/types/ChromeMetricsStorage";
import {getCurrentUrl} from "@/entrypoints/content/utils/getCurrentUrl";

type StatsDataContext = Array<Metrics>;

export const StatsDataContext = createContext<StatsDataContext>([]);

export const useStatsData = (): Metrics[] => useContext(StatsDataContext);

export const StatsDataProvider = ({children}: PropsWithChildren) => {
    const currentUrl = getCurrentUrl();
    const [data, setData] = useState<Array<Metrics>>([]);

    useEffect(() => {
        storage.sync.get<Record<string, Metrics>>(currentUrl, {}).then(initialData => {
            setData(Object.values(initialData));
        });

        const unwatch = storage.sync.watch<ChromeMetricsStorage>(currentUrl, (newData, oldData) => {
            setData(Object.values(newData ?? {}));
        });
        return () => {
            unwatch.then(callback => callback());
        };
    }, [currentUrl]);

    const sortedData = useMemo(() => {
        return data.sort((a, b) => b.timestamp - a.timestamp);
    }, [data]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <StatsDataContext.Provider value={sortedData}>
            {children}
        </StatsDataContext.Provider>
    );
};
