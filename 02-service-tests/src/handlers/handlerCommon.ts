import Ajv from "ajv";
import { Schema } from "ajv";
import { IDatabase } from "../database";

export interface CommonHandlerParams {
    database: IDatabase;
    requestBody: object;
}

export type AsyncJsonResponseHandler = (params: CommonHandlerParams) => Promise<object>;

/** Ajv based validation */
export function validate<T>(o: object, schema: Schema): T {
    const validate = new Ajv().compile<T>(schema);
    const isValid = validate(o);
    if (isValid) {
        return o as any as T;
    } else {
        throw new Error(`Invalid request data. ${JSON.stringify(validate.errors)}`);
    }
}
