import { Schema, model, Document, Types } from 'mongoose';

export interface WatchlistItemDocument extends Document {
    watchlistId: Schema.Types.ObjectId;
    symbolId: number;
    changedAt: Date;
    createdAt: Date;
    deletedAt: Date;
};

const WatchlistItemSchema = new Schema({
    watchlistId: {
        type: Schema.Types.ObjectId,
        ref: 'Watchlist'
    },
    symbolId: {
        type: Number,
        require: true
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
        collection: 'watchlistItems'
    });

WatchlistItemSchema.index({ watchlistId: 1, symbolId: 1 }, { unique: true });

export const WatchlistItem = model<WatchlistItemDocument>('Instrument', WatchlistItemSchema);