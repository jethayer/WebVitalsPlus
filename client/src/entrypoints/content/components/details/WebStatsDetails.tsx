import React from 'react';
import {tss} from "@/entrypoints/content/hooks/tss";
import RadarChart from "@/entrypoints/content/components/details/webStats/RadarChart";
import {Button, Typography, Divider} from "@mui/material";
import Timeline from "@/entrypoints/content/components/details/webStats/Timeline";
import classNames from 'classnames';
import {useStatsData} from "@/entrypoints/content/hooks/useStatsData";
import {metricFactory} from "@/entrypoints/content/utils/metricFactory";
import {useRouter} from "@/entrypoints/content/hooks/useRouter";
import {CoPilot} from "@/entrypoints/content/components/details/webStats/CoPilot";
import {GaugeChart} from "@/entrypoints/content/components/details/webStats/gaugeChart/GaugeChart";
import {METRIC_DETAILS} from '@/constants/metricDetails';
import {RouteKey} from "@/constants/routeKey";
import {UrUxDescription} from "@/entrypoints/content/components/details/webStats/UrUxDescription";
import {NoData} from "@/entrypoints/content/components/details/webStats/NoData";
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles() (theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        columnGap: "10px",
        padding: '10px 20px',
        margin: '0',
        backgroundColor: theme.backgroundColor,
        color: theme.color,
        borderBottom: '2px solid #e0e0e0',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',
    },
    detail: {
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
    },
    detailLeft: {
        flex: 3
    },
    detailRight: {
        flex: 1
    },
    insight: {
        display: "flex",
        flexDirection: "row",
        columnGap: "10px"
    },
    gaugeDetails: {
        flex: 3
    },
    gaugeChart: {
        flex: 1
    },
    closeButton: {
        alignSelf: 'flex-end',
        fontSize: '0.7rem',
        marginTop: 'auto'
    }
}));

type Props = {
    activeRoute: RouteKey;
};


export const WebStatsDetails = ({activeRoute}: Props) => {
    const {classes} = useStyles();
    const {setActiveRoute, activeTimestamp} = useRouter();
    const data = useStatsData();

    const currentMetrics = data.find(metric => metric.timestamp === activeTimestamp) ?? data[data.length - 1];
    const currentMetric = metricFactory(activeRoute, currentMetrics[activeRoute], currentMetrics.timestamp, false);
    const activeMetricDetails = METRIC_DETAILS[activeRoute];

    return (
        <div className={classes.root}>
            <div className={classNames(classes.detail, classes.detailLeft)}>
                <div>
                    <Typography variant="h5">{activeMetricDetails.fullName} ({activeRoute})</Typography>
                    <Typography variant="subtitle1" gutterBottom>{activeMetricDetails.description}</Typography>
                </div>
                <Timeline metricKey={activeRoute}/>

                <Divider flexItem/>

                {currentMetric && !!currentMetric.value &&
                    <div className={classes.insight}>
                        <div>
                            <UrUxDescription metric={currentMetric} activeRoute={activeRoute}/>
                            <CoPilot metric={currentMetric} activeRoute={activeRoute}/>
                        </div>
                        <div className={classes.gaugeChart}>
                            <GaugeChart metric={currentMetric} webMetricKey={activeRoute}/>
                        </div>
                    </div>
                }

                {currentMetric && !currentMetric.value &&
                    <div>
                        <div>
                            <NoData/>
                        </div>
                    </div>
                }

            </div>
            <Divider orientation="vertical" flexItem/>
            <div className={classNames(classes.detail, classes.detailRight)}>
                <RadarChart webMetricKey={activeRoute}/>
                {/*<Button*/}
                {/*    variant="text"*/}
                {/*    size="small"*/}
                {/*    onClick={() => generateReport()}*/}
                {/*>*/}
                {/*    Download Details*/}
                {/*</Button>*/}
                <Button
                    className={classes.closeButton}
                    variant="text"
                    size="small"
                    onClick={() => setActiveRoute(null)}
                >
                    Close
                </Button>
            </div>
        </div>
    );

};
