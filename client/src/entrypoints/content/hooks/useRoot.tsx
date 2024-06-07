import {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {NETWORK_METRIC_KEY, NetworkMetricKey, WEB_METRIC_KEY, WebMetricKey} from "@/constants/metricKey";
import {RouteKey} from "@/constants/routeKey";
import ReactDOM from "react-dom/client";

type Context = {
    root: HTMLElement;
};

export const RootContext = createContext<Context>({
    root: document.body
});

export const useRoot = (): HTMLElement => useContext(RootContext).root;


export const RootProvider = ({children, root}: PropsWithChildren<Context>) => {
    return (
        <RootContext.Provider value={{
            root: root
        }}>
            {children}
        </RootContext.Provider>
    );
};
