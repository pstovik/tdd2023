import { BowlingRoll } from "../databaseStructures";
import { CommonHandlerParams, validate } from "./handlerCommon";

export interface RecordRollRequestBody {
    pins: number;
}

export async function recordRollHandler(params: CommonHandlerParams): Promise<{}> {
    const { database, requestBody } = params;
    const roll = validate<RecordRollRequestBody>(requestBody, {
        type: "object",
        properties: {
            pins: {
                type: "number",
            },
        },
        additionalProperties: false,
    });

    const collection = database.collection<BowlingRoll>("rolls");
    collection.insertOne({ pins: roll.pins });

    return {};
}
