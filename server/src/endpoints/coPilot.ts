import bodyParser from "body-parser";
import {Express, Request, Response} from "express";
import fetch from 'node-fetch';
import {config} from '../config';

type RequestBody = {
    CLS: number | null;
    FCP: number | null;
    LCP: number | null;
    TTFB: number | null;
    FID: number | null;
    INP: number | null;
}

export const coPilotEndpoint = (app: Express) => {

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.post("/co-pilot",
        async (req: Request<unknown, unknown, RequestBody>, res: Response, next) => {

            const requestData = req.body;

            const messages = [
                {
                    role: "system",
                    content: "You are a helpful web developer assistant. Output a JSON with suggestions to improve web-vitals metrics in this format:\n" +
                        "{\n" +
                        "  \"CLS\" : null,\n" +
                        "  \"FCP\" : null,\n" +
                        "  \"LCP\" : null,\n" +
                        "  \"TTFB\" : null,\n" +
                        "  \"FID\" : null,\n" +
                        "  \"INP\" : null\n" +
                        "}",
                },
                {
                    role: "user",
                    content: `Here are the current web-vitals metrics, suggest metric-specific improvements and analysis: 
                     - CLS: ${requestData.CLS || 'N/A'}
                     - FCP: ${requestData.FCP || 'N/A'} 
                     - LCP: ${requestData.LCP || 'N/A'}
                     - TTFB: ${requestData.TTFB || 'N/A'} 
                     - FID: ${requestData.FID || 'N/A'}
                     - INP: ${requestData.INP || 'N/A'}`
                }
            ];
            // console.log("request data:", requestData);
            // console.log("constructed message:", messages);


            try {
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${config.gtp_token}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo-0125",
                        messages,
                        response_format: {type: "json_object"},
                    })
                });
    
                const data = await response.json();
                // console.log("OpenAI API response data:", data);
                res.json(data);
                res.end();
                next();
            } catch (error: any) {
                console.error("Failed to contact OpenAI API:", error);
                res.status(500).json({ message: "Failed to fetch data from OpenAI API", error: error.message });
            }

        });
}
