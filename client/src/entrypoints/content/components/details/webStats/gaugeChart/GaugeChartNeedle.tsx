import React, {PureComponent, useMemo} from 'react';
import {WebMetricKey} from '@/constants/metricKey';
import {THRESHOLDS} from '@/constants/thresholds';

const RADIAN = Math.PI / 180;


const getRange = (metric: WebMetricKey, metricValue: number) => {
    const {good, bad} = THRESHOLDS[metric];
    if (metricValue <= good) {
        return {start: 180, end: 120};
    }

    if (metricValue <= bad) {
        return {start: 120, end: 60};
    }

    return {start: 60, end: 0};
};


type Props = {
    metric: WebMetricKey, metricValue: number, cx: number, cy: number, iR: number, oR: number, color: string
};

export const GaugeChartNeedle = ({metric, metricValue, cx, cy, iR, oR, color}: Props) => {

    const needleAngle = useMemo(() => {
        const range = getRange(metric, metricValue);
        const valueRange = THRESHOLDS[metric].bad - THRESHOLDS[metric].good;
        const normalizedValue = (metricValue - THRESHOLDS[metric].good) / valueRange;

        const sensitivityFactor = 4;
        const scaledValue = Math.pow(normalizedValue, sensitivityFactor);

        const metricRange = THRESHOLDS[metric].bad - THRESHOLDS[metric].good;
        const gaugeRange = range.start - range.end;
        const scaledAngle = scaledValue * (gaugeRange / metricRange);

        const angle = range.start - scaledAngle;
        return (angle < 0) ? 0 : (angle > 180) ? 180 : angle;
    }, [metric, metricValue]);


    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * needleAngle);
    const cos = Math.cos(-RADIAN * needleAngle);
    const r = 5;
    const x0 = cx;
    const y0 = cy;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return <>
        <circle key="needle-circle" cx={x0} cy={y0} r={r} fill={color} stroke="none"/>
        <path key="needle-path" d={`M${xba} ${yba} L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none"
              fill={color}/>
    </>;
};

