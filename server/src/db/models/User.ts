import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    isActivated: boolean;
    activationLink?: string;
    changedAt: Date;
    createdAt: Date;
    deletedAt: Date;
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
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type : String,
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
        type: Date
    },
  }, 
  {
    collection: 'users'
  });
  
  export const User = model<UserDocument>('User', UserSchema);