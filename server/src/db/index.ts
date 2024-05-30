import mongoose from 'mongoose';
import TestCollection from './collections/TestCollection'; // Assuming TestCollection is a Mongoose schema

class DB {
  public async connect(): Promise<DB> {
    const url = `mongodb://${process.env.CONN}${process.env.MONGODB_DB_NAME}`;

    try {
      await mongoose.connect(url);

      if (mongoose.connection.readyState === 1) {
        console.log('Connected to MongoDB');
      }

      return this;

    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      throw err;
    }
  }

  public async disconnect(): Promise<void> {
    if (mongoose.connection.readyState === mongoose.STATES.connected) {
      await mongoose.connection.close(false);
    }
  }

  public getModel<T extends mongoose.Model<any>>(name: string): T {
    const model = mongoose.model(name, (TestCollection as any).schema);
    return model as T;
  }
}

export default new DB();