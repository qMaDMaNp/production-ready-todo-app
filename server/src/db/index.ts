import mongoose from 'mongoose';

class DB {
  public async connect() {
    const url = `mongodb://${process.env.MONGODB_HOST}${process.env.MONGODB_DB_NAME}`;

    try {
      await mongoose.connect(url);

      if (mongoose.connection.readyState === 1) 
        console.log('Connected to MongoDB');
    }
    catch (err) {
      console.error('Error connecting to MongoDB:', err);
      throw err;
    }
  }
}

export default new DB();