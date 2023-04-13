import { createInMemoryDatabase, InMemoryDatabaseMock } from "../src/database";
import { RecordRollRequestBody, recordRollHandler } from "../src/handlers/recordRollHandler";

describe("recordRollHandler::", () => {
    let database: InMemoryDatabaseMock;
    beforeEach(async () => {
        database = await createInMemoryDatabase();
    });

    it("should store rolls into database", async () => {
        // act
        await recordRollHandler({
            requestBody: { pins: 1 } as RecordRollRequestBody,
            database,
        });
        // assert
        const inMemoryCollection = database.memoryCollections.get("rolls")!;
        expect(inMemoryCollection.items).toEqual([{ pins: 1 }]);
    });

    it("should fail on invalid data in request body", async () => {
        // act
        const promise = recordRollHandler({
            requestBody: { invalidData: "" },
            database,
        });
        // assert
        await expectAsync(promise).toBeRejected();
    });
});
