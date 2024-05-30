import { Schema, model, Document } from 'mongoose';

export interface TokenDocument extends Document {
    user: Schema.Types.ObjectId;
    refreshToken: string;
    expiresAt: Date;
    changedAt: Date;
    createdAt: Date;
    deletedAt: Date;
  };

  const TokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    refreshToken: {
        type: String,
        required: true
    },
    expiresAt: {
      type: Date
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
    collection: 'tokens'
  });
  
  export const Token = model<TokenDocument>('Token', TokenSchema);