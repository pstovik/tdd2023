import * as express from "express";
import { getScoreHandler } from "./handlers/getScoreHandler";
import { IDatabase } from "./database";
import { AsyncJsonResponseHandler } from "./handlers/handlerCommon";
import { recordRollHandler } from "./handlers/recordRollHandler";

export function startServer(port: number, database: IDatabase) {
    const app = express();
    app.use(express.json());

    // requests registrations
    app.get("/score", asyncJsonReponse(getScoreHandler, database));
    app.post("/roll", asyncJsonReponse(recordRollHandler, database));
    // ...

    app.listen(port);
    console.log(`Server started on port ${port}`);
}

function asyncJsonReponse(handler: AsyncJsonResponseHandler, database: IDatabase): express.RequestHandler {
    return (req, res) => {
        handler({
            database,
            requestBody: req.body,
        })
            .then((result) => res.json(result))
            .catch((e) => {
                console.log(e);
                res.sendStatus(500);
            });
    };
}
