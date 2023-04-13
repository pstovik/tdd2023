import { createInMemoryDatabase } from "./database";
import { startServer } from "./server";

run();

async function run() {
    // NOTE: in production the `connectMongoDatabase` will be used
    startServer(3000, await createInMemoryDatabase());
}
