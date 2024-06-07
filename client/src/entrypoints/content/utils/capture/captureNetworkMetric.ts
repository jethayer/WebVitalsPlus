import {NetworkMetric} from "@/types/NetworkMetric";

export const captureNetworkMetric = async (onCapture: (data: NetworkMetric) => void) => {
    let watcher: NodeJS.Timeout;
    const request: Record<string, PerformanceResourceTiming> = {};

    return new Promise((resolve) => {
        const buildNetworkMetric = () => {
            return Object.values(request).reduce((acc, entry) => {
                return {
                    count: acc.count + 1,
                    maxDuration: Math.max(acc.maxDuration, entry.duration),
                    transferSize: acc.transferSize + (entry.transferSize ?? 0),
                    decodedBodySize: acc.decodedBodySize + (entry.decodedBodySize ?? 0),
                    encodedBodySize: acc.encodedBodySize + (entry.encodedBodySize ?? 0),
                    requestTypesCount: {
                        ...acc.requestTypesCount,
                        [entry.initiatorType]: (acc.requestTypesCount?.[entry.initiatorType] ?? 0) + 1
                    }
                }
            }, {
                count: 0,
                maxDuration: 0,
                transferSize: 0,
                decodedBodySize: 0,
                encodedBodySize: 0,
                requestTypesCount: {},
            } as NetworkMetric);
        }

        const observer = new PerformanceObserver((list) => {
            restAndCreateWatcher();
            list.getEntries().forEach((entry) => {
                request[entry.name] = entry as PerformanceResourceTiming;
            });
            onCapture(buildNetworkMetric());
        });

        const restAndCreateWatcher = () => {
            if (watcher) {
                clearTimeout(watcher);
            }
            watcher = setTimeout(() => {
                onCapture(buildNetworkMetric());
                observer.disconnect();
                resolve(buildNetworkMetric());
            }, 2000);
        }

        observer.observe({type: "resource", buffered: true});
    });
}
