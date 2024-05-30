import DB, { IDbCollection } from '../../db';
import { ObjectId } from 'mongodb';

export class TestCollection implements IDbCollection {
    public collectionName: string = 'test';

    async initCollection() {
        // await DB.db.createCollection(this.collectionName)
        // await DB.db.createIndex(this.collectionName, {testId: 1});
    }

    async getTests(query: Object = {}, limit: number = 20, skip: number = 0): Promise<any[]> {
        const collection = DB.db.collection(this.collectionName);
        let tests: any[] = [];

        try {

        }
        catch (e) {
            console.error(e)
        }

        return tests;
    }

    async getTest(id: any): Promise<any> {
        const collection = DB.db.collection(this.collectionName);
        let test = null;

        try {

        }
        catch (e) {
            console.error(e);
        }

        return test;
    }

    async getTestCount(): Promise<Object> {
        const collection = DB.db.collection(this.collectionName);
        let counts: Object = {};

        try {

        }
        catch (e) {
            console.error(e)
        }

        return counts;
    }

    async createTest(fields: Object) {
        const collection = DB.db.collection(this.collectionName);
        let newTest = null;
        let timestamp = new Date().getTime();

        const testToSave = {
            _id: new ObjectId(),
            //fields here
            ...fields,
            updateddAt: timestamp,
            createdAt: timestamp,
        };

        try {
            await collection.insertOne(testToSave);
            newTest = testToSave;
        }
        catch (e) {
            e = e.message || e;
            throw `createTest: ${e}`;
        }

        return newTest
    }

    async updateTestField(id: any, fieldName: string, value: any): Promise<number> {
        const collection = DB.db.collection(this.collectionName);
        let modifiedCount = 0;

        try {
            let dbResponse = await collection.updateOne({ _id: id }, { $set: { [fieldName]: value } });
            modifiedCount = dbResponse.modifiedCount;

            return modifiedCount;
        }
        catch (e) {
            console.error(`updateTestFields: ${id}: ${e}`)
        }
    }

    async updateManyTestField(ids: any[], fieldName: string, value: any): Promise<number> {
        const collection = DB.db.collection(this.collectionName);
        let modifiedCount = 0;

        try {
            let dbResponse = await collection.updateMany({ _id: { $in: ids } }, { $set: { [fieldName]: value } });
            modifiedCount = dbResponse.modifiedCount;

            return modifiedCount;
        }
        catch (e) {
            console.error(`updateManyTestField: ${ids}: ${e}`)
        }
    }

    async updateTestFields(id: any, fields: Object): Promise<number> {
        const collection = DB.db.collection(this.collectionName);
        let modifiedCount = 0;

        try {
            let dbResponse = await collection.updateOne({ _id: id }, { $set: fields });
            modifiedCount = dbResponse.modifiedCount;
        }
        catch (e) {
            console.error(`updateTestFields: ${id}: ${e}`)
        }

        return modifiedCount;
    }
}

export default new TestCollection();