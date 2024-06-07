import {METRIC_RATING} from "@/constants/metricRating";
import classNames from "classnames";
import {AbstractWebMetric} from "@/entrypoints/content/utils/models/AbstractWebMetric";
import {tss} from "tss-react";
import {useRouter} from "@/entrypoints/content/hooks/useRouter";
import { makeStyles } from "tss-react/mui";

const useStyles =  makeStyles() (theme => ({
    metricValue: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        color: "whitesmoke",
        backgroundColor: "#CCCCCC",
        width: 36,
        height: 36,
        fontSize: 9,
        cursor: "pointer",
    },
    good: {
        backgroundColor: "#008000",
    },
    needsImprovement: {
        backgroundColor: "#FFA500",
        width: 32,
        height: 32
    },
    poor: {
        background: "#FF0000",
        width: 28,
        height: 28
    },
    oldGood: {
        backgroundColor: "#80c080",
    },
    oldNeedsImprovement: {
        backgroundColor: "#ffd280",
    },
    oldPoor: {
        backgroundColor: "#ff8080",
    },
    highlight: {
        border: `4px solid ${theme.tertiaryColor}`,
    }

}));


interface Props {
    metric: AbstractWebMetric;
    highlight?: boolean;
}

export const StatValue = ({metric, highlight}: Props) => {
    const {classes} = useStyles();
    const {setActiveTimestamp} = useRouter();

    const handleClick = () => {
        setActiveTimestamp(metric.timestamp);
    }

    return (
        <div className={classNames(classes.metricValue,
            {
                [classes.oldGood]: !!metric.value && metric?.old && metric?.rating == METRIC_RATING.GOOD,
                [classes.oldNeedsImprovement]: !!metric.value && metric?.old && metric?.rating == METRIC_RATING.NEEDS_IMPROVEMENT,
                [classes.oldPoor]: !!metric.value && metric?.old && metric?.rating == METRIC_RATING.POOR,
                [classes.good]: !!metric.value && metric?.rating == METRIC_RATING.GOOD,
                [classes.needsImprovement]: !!metric.value && metric?.rating == METRIC_RATING.NEEDS_IMPROVEMENT,
                [classes.poor]: !!metric.value && metric?.rating == METRIC_RATING.POOR,
                [classes.highlight]: !!highlight
            }
        )} onClick={handleClick}>
            {metric?.displayValue}
        </div>
    )
}
