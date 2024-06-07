import {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {NETWORK_METRIC_KEY, NetworkMetricKey, WEB_METRIC_KEY, WebMetricKey} from "@/constants/metricKey";
import {RouteKey} from "@/constants/routeKey";

type RouterContext = {
    activeRoute: RouteKey | null;
    networkMetricActive: boolean;
    activeTimestamp: number | null;
    setActiveRoute: (metric: RouteKey | null) => void;
    setActiveTimestamp: (timestamp: number | null) => void;
};

export const RouterContext = createContext<RouterContext>({
    activeRoute: null,
    networkMetricActive: false,
    activeTimestamp: null,
    setActiveRoute: () => {
    },
    setActiveTimestamp: () => {
    }
});

export const useRouter = (): RouterContext => useContext(RouterContext);

export const RouterProvider = ({children}: PropsWithChildren) => {
    const [activeRoute, setActiveRoute] = useState<RouteKey | null>(null);
    const [activeTimestamp, setActiveTimestamp] = useState<number | null>(null);

    return (
        <RouterContext.Provider value={{
            activeRoute: activeRoute,
            networkMetricActive: (activeRoute && activeRoute in NETWORK_METRIC_KEY) ?? false,
            activeTimestamp,
            setActiveRoute,
            setActiveTimestamp
        }}>
            {children}
        </RouterContext.Provider>
    );
};
