import { MongoClient, Db } from "mongodb";
import TestCollection from "./collections/TestCollection";

class DB {
    public client: MongoClient | null = null;
    public db: Db | null = null;

    public async connect() {
        const url = process.env.CONN;
        const dbName = process.env.DB_NAME;

        try {
            const collectionsDefinition: IDbCollection[] = [
                TestCollection,
            ];

            //@ts-ignore
            const client = new MongoClient(url, { useUnifiedTopology: true });
            await client.connect();
            
            this.client = client;
            this.db = client.db(dbName);
        } catch (err) {
            console.error(err);
        }
    }

    public async disconnect() {
        if (this.client) await this.client.close(false)
    }
}

export interface IDbCollection {
    collectionName: string;
    initCollection(): Promise<void>;
}

export default new DB();