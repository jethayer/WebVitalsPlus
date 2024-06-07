import {StrictMode} from 'react';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {App} from "./App";
import {TssCacheProvider} from "tss-react";
import {StatsDataProvider} from "@/entrypoints/content/hooks/useStatsData";
import {RouterProvider} from "@/entrypoints/content/hooks/useRouter";
import {RootProvider} from "@/entrypoints/content/hooks/useRoot";
import {ThemeProvider} from "@/entrypoints/content/hooks/useTheme";

const muiCache = (container: Node) => createCache({
    key: 'mui',
    container: container,
    prepend: true,
});

const tssCache = (container: Node) => createCache({
    "key": "tss",
    container: container,
});

type Props = {
    container: Node;
}

export function Main({container}: Props) {
    return (
        <StrictMode>
            <RootProvider root={container.lastChild as HTMLElement}>
                <CacheProvider value={muiCache(container.firstChild as Node)}>
                    <TssCacheProvider value={tssCache(container.firstChild as Node)}>
                        <ThemeProvider>
                            <StatsDataProvider>
                                <RouterProvider>
                                    <App/>
                                </RouterProvider>
                            </StatsDataProvider>
                        </ThemeProvider>
                    </TssCacheProvider>
                </CacheProvider>
            </RootProvider>
        </StrictMode>
    );
}
