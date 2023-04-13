import { MongoClient, Collection, Document, FindCursor, WithId } from "mongodb";

export interface IDatabase {
    collection<T extends Document>(collection: string): Collection<T>;
}

/** Real db connection */
export async function connectMongoDatabase(url: string, database: string): Promise<IDatabase> {
    const client = await MongoClient.connect(url);
    return {
        collection: client.db(database).collection,
    };
}

/** Test purpose / in-memory db */
export async function createInMemoryDatabase(): Promise<InMemoryDatabaseMock> {
    return new InMemoryDatabaseMock();
}

export class InMemoryDatabaseMock implements IDatabase {
    memoryCollections: Map<string, InMemoryCollectionMock<Document>> = new Map();

    collection<T extends Document>(collectionName: string) {
        const { memoryCollections } = this;
        if (!memoryCollections.has(collectionName)) {
            memoryCollections.set(collectionName, new InMemoryCollectionMock());
        }
        return memoryCollections.get(collectionName) as unknown as Collection<T>; // fake support of all operations
    }
}

class InMemoryCollectionMock<T extends Document> {
    items: T[] = [];

    async insertOne(item: T): Promise<void> {
        this.items.push(item);
    }

    find(): FindCursor<WithId<T>> {
        return {
            toArray: async () => this.items,
        } as unknown as FindCursor<WithId<T>>; // fake support of find operation
    }
}
