import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    changedAt: Date;
    createdAt: Date;
    deletedAt: Date | null;
  };
  
  const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true 
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    changedAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    },
  }, 
  {
    collection: 'users'
  });
  
  export const User = model<UserDocument>('User', UserSchema);