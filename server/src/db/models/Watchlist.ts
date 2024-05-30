import { Schema, model, Document, Types } from 'mongoose';

export interface WatchlistDocument extends Document {
    userId: Schema.Types.ObjectId;
    color: string;
    changedAt: Date;
    createdAt: Date;
    deletedAt: Date;
};

const WatchlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
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
        collection: 'watchlists'
    });

export const Watchlist = model<WatchlistDocument>('Watchlist', WatchlistSchema);