import React from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {AppBar, Tooltip} from "@mui/material";
import {tss} from "../../hooks/tss";
import {TabOverview} from "@/entrypoints/content/components/bar/TabOverview";
import {METRIC_KEY} from "@/constants/metricKey";
import {useRouter} from "@/entrypoints/content/hooks/useRouter";
import {DownloadButton} from "@/entrypoints/content/components/bar/DownloadButton";
import {useTheme} from "@/entrypoints/content/hooks/useTheme";
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles() (theme => ({
    root: {
        display: 'flex',
        alignItems: 'left',
        flexDirection: 'row',
        columnGap: "10px",
        padding: '4px 20px',
        margin: 0,
        borderBottom: "2px solid",
        borderBottomColor: theme.tertiaryColor,
        backgroundColor: theme.backgroundColor,
        color: theme.color,
    },
}));


export const StatsBar = () => {
    const theme = useTheme();
    const {classes} = useStyles();
    const {activeRoute, setActiveRoute} = useRouter();

    return (
        <AppBar position="static" color={'inherit'}>
            <div className={classes.root}>
                <TabOverview
                    metricKey={METRIC_KEY.CLS}
                    displayCount={3}
                    isActive={METRIC_KEY.CLS === activeRoute}
                    onClick={() => setActiveRoute(METRIC_KEY.CLS)}
                />

                <TabOverview
                    metricKey={METRIC_KEY.FCP}
                    displayCount={3}
                    isActive={METRIC_KEY.FCP === activeRoute}
                    onClick={() => setActiveRoute(METRIC_KEY.FCP)}
                />

                <TabOverview
                    metricKey={METRIC_KEY.FID}
                    displayCount={3}
                    isActive={METRIC_KEY.FID === activeRoute}
                    onClick={() => setActiveRoute(METRIC_KEY.FID)}
                />

                <TabOverview
                    metricKey={METRIC_KEY.INP}
                    displayCount={3}
                    isActive={METRIC_KEY.INP === activeRoute}
                    onClick={() => setActiveRoute(METRIC_KEY.INP)}
                />

                <TabOverview
                    metricKey={METRIC_KEY.LCP}
                    displayCount={3}
                    isActive={METRIC_KEY.LCP === activeRoute}
                    onClick={() => setActiveRoute(METRIC_KEY.LCP)}
                />

                <TabOverview
                    metricKey={METRIC_KEY.TTFB}
                    displayCount={3}
                    isActive={METRIC_KEY.TTFB === activeRoute}
                    onClick={() => setActiveRoute(METRIC_KEY.TTFB)}
                />

                <DownloadButton/>
            </div>
        </AppBar>
    );
};
