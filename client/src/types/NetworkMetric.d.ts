export type NetworkMetricRequestTypes =
    "audio"
    | "beacon"
    | "body"
    | "css"
    | "early-hint"
    | "embed"
    | "fetch"
    | "frame"
    | "iframe"
    | "icon"
    | "image"
    | "img"
    | "input"
    | "link"
    | "navigation"
    | "object"
    | "ping"
    | "script"
    | "track"
    | "video"
    | "xmlhttprequest"
    | string

export type NetworkMetric = {
    count: number,
    maxDuration: number,
    transferSize: number,
    decodedBodySize: number,
    encodedBodySize: number,
    requestTypesCount?: Record<NetworkMetricRequestTypes, number>
}
