import React from 'react';
import {
    Radar,
    RadarChart as RechartsRadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Legend,
    ResponsiveContainer
} from 'recharts';
import {useStatsData} from "@/entrypoints/content/hooks/useStatsData";
import {WebMetricKey} from "@/constants/metricKey";
import {THRESHOLDS} from "@/constants/thresholds";
import {useRouter} from "@/entrypoints/content/hooks/useRouter";
import {useTheme} from '@mui/material';


interface RadarChartProps {
    webMetricKey: WebMetricKey;
}


const RadarChart = ({webMetricKey}: RadarChartProps) => {
    const {activeTimestamp} = useRouter();
    const webData = useStatsData();
    const theme = useTheme();

    const currentMetric = webData.find(metric => metric.timestamp === activeTimestamp) ?? webData[webData.length - 1];

    const radarFormatData = Object.keys(THRESHOLDS).map((key) => {
        const metricKey = key as WebMetricKey;
        const value = currentMetric?.[metricKey]?.value ?? 0;
        const threshold = THRESHOLDS[metricKey];
        let fullMark = threshold.bad; // use 'bad' threshold as fullMark
        let goodMark = threshold.good;

        // apply scaling factor to FID so it is visible on chart
        let scalingFactor = 1;
        // setup for goodMark normalization
        const goodNormalizedValue = (goodMark / fullMark) * 100;

        // Normalize value as a percentage of the fullMark, ensuring a minimum of 5%
        let normalizedValue = (value / fullMark) * 100;
        normalizedValue = Math.max(5, Math.min(normalizedValue, 100));

        return {
            subject: key,
            A: normalizedValue, // Current metric normalized
            B: goodNormalizedValue, // Good threshold normalized
            fullMark: 100 // Consistent fullMark for normalization
        };
    });
    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <RechartsRadarChart outerRadius={90} data={radarFormatData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Metrics" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Good Range" dataKey="B" stroke="#2f4f4f" fill="#82ca9d" fillOpacity={0.3} />
                    <Legend />
                </RechartsRadarChart>
            </ResponsiveContainer>
        </>
    );
};

export default RadarChart;
