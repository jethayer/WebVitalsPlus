import GaugeComponent from 'react-gauge-component';
import { AbstractWebMetric } from '../../../../utils/models/AbstractWebMetric';
import { WebMetricKey } from '@/constants/metricKey';
import { tss } from 'tss-react';
import { Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from "react";

const useStyles = tss.create({
    guageChart: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center"
    }
});

type Props = {
    metric: AbstractWebMetric;
    webMetricKey: WebMetricKey;
}

export function GaugeChart({ metric, webMetricKey }: Props) {
    const { classes } = useStyles();
    const theme = useTheme();
    const thresholds = metric.getThresholds();
    const [themeKey, setThemeKey] = useState("");

    useEffect(() => {
        const newThemeKey = theme.color;
        setThemeKey(newThemeKey);
    }, [theme.color]);

    return (
        <div className={classes.guageChart}>
            <GaugeComponent
                type="semicircle"
                arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                        {
                            limit: thresholds.GOOD,
                            color: '#5BE12C',
                            showTick: true
                        },
                        {
                            limit: thresholds.BAD,
                            color: '#F5CD19',
                            showTick: true
                        },
                        {
                            color: '#EA4228'
                        }
                    ]
                }}
                pointer={{
                    color: '#ADD8E6',
                    length: 0.80,
                    width: 15,
                    // elastic: true,
                }}
                labels={{
                    valueLabel: {
                        formatTextValue: value => metric.buildDisplayValue(value),
                        style: {
                            fill: theme.color,
                            textShadow: 'none'
                        }
                    },
                    tickLabels: {
                        type: 'outer',
                        hideMinMax: true,
                        defaultTickValueConfig: {
                            formatTextValue: value => metric.buildDisplayValue(value),
                            style: {
                                fill: theme.color,
                                textShadow: 'none'
                            }
                        },
                        defaultTickLineConfig: {
                            color: theme.color,
                        },
                        ticks: [
                            { value: thresholds.GOOD },
                            { value: thresholds.BAD }
                        ],
                    }
                }}
                value={metric.value ?? 0}
                minValue={0}
                maxValue={thresholds.GOOD + thresholds.BAD}
                key={themeKey}
            />
            <Typography variant="caption" style={{ color: theme.color }}>
                {webMetricKey}
            </Typography>
        </div>
    );
}
