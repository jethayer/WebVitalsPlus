import React from "react";
import {GlobalStyles} from "tss-react";
import {StatsBar} from "./components/bar/StatsBar";
import {useStatsData} from "@/entrypoints/content/hooks/useStatsData";
import {WebStatsDetails} from "@/entrypoints/content/components/details/WebStatsDetails";
import {LoadingBar} from "@/entrypoints/content/components/bar/LoadingBar";
import {useRouter} from "@/entrypoints/content/hooks/useRouter";
import {useTheme} from "@/entrypoints/content/hooks/useTheme";

export function App() {
    const data = useStatsData();
    const theme = useTheme();
    const {activeRoute} = useRouter();

    return (
        <>
            <GlobalStyles
                styles={{
                    "body": {
                        fontFamily: "Roboto-Regular, Helvetica",
                        color: '#000000',
                        fontSize: 12,
                        fontWeight: 400,
                        minHeight: 50,
                        margin: 0,
                        padding: 0,
                    },
                    "*": {
                        boxSizing: 'border-box'
                    },
                }}
            />
            {
                data.length > 0 && <>
                    <StatsBar/>

                    {
                        activeRoute && <WebStatsDetails activeRoute={activeRoute}/>
                    }
                </>
            }

            {
                data.length == 0 && <LoadingBar/>
            }
        </>
    );
}
