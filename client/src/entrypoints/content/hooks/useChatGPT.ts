import {useState, useEffect, useCallback} from 'react';
import {useStatsData} from './useStatsData';
import {debounce} from "@/utils/debounce";

export const useChatGPT = () => {
    const [suggestions, setSuggestions] = useState<string>('');
    const metricsData = useStatsData();

    const fetchData = useCallback(debounce(async () => {
        if (!metricsData.length) return;

        const latestMetrics = metricsData[metricsData.length - 1];
        try {
            const response = await fetch("http://127.0.0.1:3001/co-pilot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    CLS: latestMetrics.CLS?.value || null,
                    FCP: latestMetrics.FCP?.value || null,
                    LCP: latestMetrics.LCP?.value || null,
                    TTFB: latestMetrics.TTFB?.value || null,
                    FID: latestMetrics.FID?.value || null,
                    INP: latestMetrics.INP?.value || null,
                })
            });

            const data = await response.json();
            if (data.choices && data.choices[0] && data.choices[0].message) {
                setSuggestions(data.choices[0].message.content.trim());
                console.log('ChatGPT Suggestions:', data.choices[0].message.content.trim());
            }
        } catch (error) {
            console.error('Error fetching suggestions from OpenAI:', error);
        }
    }, 1000), [metricsData]); // debounce 1s wait

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return suggestions;
};
