import mongoose, { model, Document, Schema } from 'mongoose';
import DB from '../../db';

export interface ITest extends Document {
  updateMany: any;
  findById: any;
  find: any;
  countDocuments: any;
  //fields here
  updatedAt: Date;
  createdAt: Date;
}

const TestSchema = new Schema({
  //fields here
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const TestModel = model<ITest>('Test', TestSchema);

export default class TestCollection {
  // No need for `collectionName` or `initCollection`

  async getTests(query: any = {}, limit: number = 20, skip: number = 0): Promise<ITest[]> {
    const tests = await TestModel.find(query).limit(limit).skip(skip).exec();
    return tests;
  }

  async getTest(id: any): Promise<ITest | null> {
    const test = await TestModel.findById(id).exec();
    return test;
  }

  async getTestCount(): Promise<number> {
    const count = await TestModel.countDocuments();
    return count;
  }

  // async createTest(fields: any): Promise<ITest> {
  //   const test = new TestModel(fields);
  //   await test.save();
  //   return test;
  // }

  async updateTestField(id: any, fieldName: string, value: any): Promise<number> {
    // Ensure proper casting for `_id`
    const updatedCount = await TestModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $set: { [fieldName]: value } }).exec();
    return updatedCount.modifiedCount;
  }

  // async updateManyTestField(ids: any[], fieldName: string, value: any): Promise<number> {
  //   const updatedCount = await TestModel.updateMany({ _id: { $in: ids.map(mongoose.Types.ObjectId) } }, { $set: { [fieldName]: value } }).exec();
  //   return updatedCount.modifiedCount;
  // }

  // async updateTestFields(id: any, fields: any): Promise<number> {
  //   const updatedCount = await TestModel.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: fields }).exec();
  //   return updatedCount.modifiedCount;
  // }
}

// Replace this with instantiation using DB connection
// export default new TestCollection();
