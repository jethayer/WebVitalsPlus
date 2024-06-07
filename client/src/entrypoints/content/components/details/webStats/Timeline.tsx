import {WebMetricKey} from "@/constants/metricKey";
import {useStatsData} from "@/entrypoints/content/hooks/useStatsData";
import {metricFactory} from "@/entrypoints/content/utils/metricFactory";
import React from 'react';
import {tss} from 'tss-react';
import TimelineNotch from './timelinehelper/TimelineNotch';
import {useRouter} from "@/entrypoints/content/hooks/useRouter";
import {calculateDateDiff} from "@/utils/calculateDateDiff";

const useStyles = tss.create({
    timelineContainer: {
        position: "relative",
        marginBottom: "20px",
    },
    timelineNotches: {
        position: "relative",
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-evenly",
        columnGap: 15,
        overflowY: "auto",
        padding: "0 15px",
        zIndex: 1
    },

    timelineBar: {
        position: "absolute",
        top: "20%",
        backgroundColor: "var(--lightblue, #89D7E9)",
        width: "100%",
        height: "10px",
    }
});

interface TimelineProps {
    metricKey: WebMetricKey;
}

const Timeline: React.FC<TimelineProps> = ({metricKey}) => {
    const {classes} = useStyles();
    const {activeTimestamp} = useRouter();
    const data = useStatsData();

    const metrics = data.map((metric, i) => metricFactory(metricKey, metric[metricKey], metric.timestamp, i !== 0))

    return (
        <div className={classes.timelineContainer}>
            <div className={classes.timelineBar}/>
            <div className={classes.timelineNotches}>
                {
                    metrics.map((metric, i) => {
                        return <TimelineNotch
                            key={i}
                            metric={metric}
                            notchLabel={calculateDateDiff(metric.timestamp)}
                            highlight={metric.timestamp === activeTimestamp}
                        />;
                    }) // TODO: map metrics to their actual time period
                }
            </div>
        </div>
    );
};


export default Timeline;
