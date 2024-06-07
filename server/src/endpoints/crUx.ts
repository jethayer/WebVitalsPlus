import {Express, Request, Response} from "express";
import fetch from 'node-fetch';
import {config} from '../config';
import {retryAfterTimeout} from "../utils/retryAfterTimeout";

type RequestParams = {
    url: string;
    isMobile: boolean;
}

export const crUxEndpoint = (app: Express) => {
    app.get("/crux", async (req: Request<unknown, unknown, unknown, RequestParams>, res: Response, next) => {
        const {url, isMobile} = req.query;
        const retryCounter = req?.retryCounter ?? 1;

        const response = await fetch(`https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${config.crux_token}`, {
            method: 'POST',
            body: JSON.stringify({
                url: url,
                formFactor: isMobile ? 'PHONE' : 'DESKTOP'
            })
        })

        if (response.status >= 500) {
            throw new Error(`Invalid CrUX API status: ${response.status}`)
        }

        const jsonRecord = await response.json();
        if (jsonRecord && jsonRecord.error) {
            if (jsonRecord?.error.code === 404) {
                return null
            }

            if (jsonRecord?.error.code === 429) {
                return retryAfterTimeout(retryCounter, () => app._router.handle({
                    ...req,
                    retryCounter: retryCounter + 1
                }, res, next));
            }

            throw new Error(JSON.stringify(jsonRecord.error))
        }

        if (!jsonRecord || (jsonRecord && !jsonRecord.record.key)) {
            throw (() => {
                try {
                    return new Error(`Invalid response: ${JSON.stringify(jsonRecord)}`)
                } catch (e) {
                    return new Error(`Invalid response: ${jsonRecord}`)
                }
            })();
        }

        res.json(jsonRecord);
        res.end();
        next();
    })
    ;
}
