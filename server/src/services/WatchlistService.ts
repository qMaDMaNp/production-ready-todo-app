import { Watchlist, WatchlistDocument } from '../db/models/Watchlist';
import { WatchlistItem, WatchlistItemDocument } from '../db/models/WatchlistItem';

class WatchlistService {
    async getAll(userId: string): Promise<WatchlistDocument[]> {
        const watchlists = await Watchlist.find({ userId });
        return watchlists;
    }

    async getWatchlist(watchlistId: string) {
        const watchlist = await Watchlist.findOne({ _id: watchlistId });
        const watchlistItems = await WatchlistItem.find({ watchlistId });

        return { watchlist, watchlistItems };
    }

    async createWatchlist(name: string, userId: string, color: string): Promise<WatchlistDocument> {
        const watchlist = await Watchlist.create({ name, userId, color });
        return watchlist;
    }

    async updateWatchlist(watchlistId: string, name: string, color: string): Promise<WatchlistDocument> {
        const watchlist = await Watchlist.findOneAndUpdate({ _id: watchlistId }, { name, color }, { new: true });
        return watchlist;
    }

    async updateOrCreateWatchlistItems(watchlistId, symbolId, actionName): Promise<WatchlistItemDocument> {
        let watchlistItem = null;
        const actions = {
            add: async () => {
                watchlistItem = await WatchlistItem.findOneAndUpdate(
                    { watchlistId, symbolId },
                    { $set: { changedAt: Date.now(), deletedAt: null } },
                    { upsert: true, new: true }
                );

                return watchlistItem;
            },
            remove: async () => {
                watchlistItem = await WatchlistItem.updateOne(
                    { watchlistId, symbolId },
                    { $set: { changedAt: Date.now(), deletedAt: Date.now() } },
                    { new: true }
                );

                return watchlistItem;
            }
        }

        if (!actions[actionName]) return watchlistItem;

        await actions[actionName]();

        return watchlistItem;
    }

    async removeWatchlist(watchlistId: string): Promise<WatchlistDocument> {
        const watchlist = await Watchlist.findOneAndUpdate({ _id: watchlistId }, { $set: { changedAt: Date.now(), deletedAt: Date.now() } }, { new: true });
        await WatchlistItem.updateMany({ watchlistId }, { $set: { changedAt: Date.now(), deletedAt: Date.now() } }, { new: true });
        return watchlist;
    }
}

export default new WatchlistService();