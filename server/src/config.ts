import dotenv from "dotenv";

dotenv.config({path: ['.env.local', '.env']});

export const config = {
    http_port: process.env.HTTP_PORT,
    gtp_token: process.env.GPT_TOKEN,
    crux_token: process.env.CRUX_TOKEN,
}
