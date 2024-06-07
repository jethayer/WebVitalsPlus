import express, {Express, Request, Response} from "express";
import cors from "cors";
import {config} from "./config";
import {coPilotEndpoint} from "./endpoints/coPilot";
import {crUxEndpoint} from "./endpoints/crUx";

const app: Express = express();

app.use(cors({
    origin: function (_origin, callback) {
        callback(null, true)
    },
    optionsSuccessStatus: 200
}));


app.get("/", (_req: Request, res: Response) => {
    res.statusMessage = `method not allowed`;
    res.status(404);
    res.end();
});

coPilotEndpoint(app);
crUxEndpoint(app);

app.all("*", (_req: Request, res: Response) => {
    res.statusMessage = `method not allowed`;
    res.status(405);
    res.end();
});


app.listen(config.http_port, () => {
    console.log(`[server]: Server is running at http://localhost:${config.http_port}`);
});
