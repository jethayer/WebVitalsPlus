import {tss} from "tss-react";
import {StatValue} from "../common/StatValue";
import {WebMetricKey} from "@/constants/metricKey";
import {useStatsData} from "@/entrypoints/content/hooks/useStatsData";
import {metricFactory} from "@/entrypoints/content/utils/metricFactory";
import {AbstractWebMetric} from "@/entrypoints/content/utils/models/AbstractWebMetric";
import classNames from "classnames";
import { makeStyles } from "tss-react/mui";
import {useTheme} from "@/entrypoints/content/hooks/useTheme";
import { useRouter } from "../../hooks/useRouter";

const useStyles = makeStyles() (theme => ({
    tabOverview: {
        display: "inline-flex",
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        columnGap: "10px",
        border: "2px solid",
        borderColor: theme.tertiaryColor,
        borderRadius: "20px",
        padding: "5px 10px",
        boxShadow: "inset 0 7px 9px -7px rgba(0,0,0,0.3)",
        cursor: "pointer",
        marginBottom: 0,
        position: "relative",
        color: theme.color,
    },
    activeTab: {
        marginBottom: 0,
        borderRadius: "20px 20px 0 0",
        borderBottom: "2px solid",
        borderColor: theme.tertiaryColor,
        ['& .cover']: {
            display: "block"
        }
    },
    cover: {
        display: "none",
        position: "absolute",
        left: -2,
        right: -2,
        backgroundColor: theme.backgroundColor,
        bottom: -8,
        height: 10,
        borderLeft: '2px solid',
        borderRight: '2px solid',
        borderColor: theme.tertiaryColor,
    },
    metricList: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: "10px"
    },
    metricName: {
        textTransform: "uppercase"
    },
}));

const theme = useTheme;

interface Props {
    metricKey: WebMetricKey;
    displayCount: number;
    isActive: boolean;
    onClick: () => void;
}

export const TabOverview = ({metricKey, displayCount, onClick, isActive}: Props) => {

    const {classes} = useStyles();
    const data = useStatsData();
    const {activeTimestamp} = useRouter();


    const metrics = data
        .slice(0, displayCount)
        .map((metric, i) => metricFactory(metricKey, metric[metricKey], metric.timestamp, i !== 0) as AbstractWebMetric)

    return (
        <div className={classNames(classes.tabOverview, {[classes.activeTab]: isActive})} onClick={onClick}>
            <div className={classes.metricName}>
                {metricKey}
            </div>
            <div className={classes.metricList}>
                {metrics.map(metric => {
                    return <StatValue key={metric.timestamp} metric={metric} highlight={isActive && metric.timestamp === activeTimestamp}/>;
                })}
            </div>
            <div className={classNames(classes.cover, 'cover')}></div>
        </div>
    )
}
