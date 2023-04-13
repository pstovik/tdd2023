import { BowlingRoll } from "../databaseStructures";
import { CommonHandlerParams } from "./handlerCommon";

export async function getScoreHandler(params: CommonHandlerParams): Promise<{ score: number }> {
    const { database } = params;
    const collection = database.collection<BowlingRoll>("rolls");

    const rolls = await collection.find().toArray();
    let score = 0;
    for (const roll of rolls) {
        score += roll.pins;
    }

    return {
        score,
    };
}
