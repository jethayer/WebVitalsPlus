import React from 'react';
import {tss} from 'tss-react';
import {StatValue} from '../../../common/StatValue';
import {AbstractWebMetric} from "@/entrypoints/content/utils/models/AbstractWebMetric";

const useStyles = tss.create({
    notchMeasurement: {
        // marginBottom: "10px",
        alignSelf: "center",
    },
    notch: {
        borderRadius: "4.876px",
        backgroundColor: "var(--lightblue, #89D7E9)",
        alignSelf: "center",
        width: "7px",
        height: "20px",
    },
    notchContainer: {
        alignSelf: "stretch",
        display: "flex",
        flexBasis: "0%",
        flexDirection: "column",
        fontSize: "11px",
        fontWeight: "600",
        whiteSpace: "nowrap",
        textAlign: "center",
        lineHeight: "150%",
        "@media (max-width: 991px)": {
            whiteSpace: "initial",
        },
        justifyContent: "center"
    },
    notchText: {
        wordWrap: 'break-word',
        fontFamily: "Inter, sans-serif",
        marginTop: "7px",
        color: "var(--lightblue, #89D7E9)",
        "@media (max-width: 991px)": {
            whiteSpace: "initial",
        },
    },
})

interface TimelineNotchProps {
    metric: AbstractWebMetric;
    notchLabel: string;
    highlight: boolean;
}

const TimelineNotch: React.FC<TimelineNotchProps> = ({notchLabel, metric, highlight}) => {
    const {classes} = useStyles();

    return (
        <div className={classes.notchContainer}>
            <div className={classes.notchMeasurement}>
                <StatValue metric={metric} highlight={highlight}/>
            </div>
            <div className={classes.notchText}>
                {notchLabel}
            </div>
        </div>
    )

}

export default TimelineNotch;
