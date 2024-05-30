import { RequestHandler } from 'express';
import WatchlistService from '../services/WatchlistService';

export const show: RequestHandler = async (req, res) => {
  try {
    //@ts-ignore
    const userId = req.user.id;

    const watchlists = await WatchlistService.getAll(userId);

    if (!watchlists || watchlists.length === 0) {
      return res.status(404).send('No watchlists found for user');
    }

    res.status(200).json(watchlists);
  }
  catch (e) {
    res.status(500).send(e);
  }
};

export const showOne: RequestHandler = async (req, res) => {
  try {
    const watchlistId = req.params.id;

    const watchlist = await WatchlistService.getWatchlist(watchlistId);

    //@ts-ignore
    if (!watchlist) {
      return res.status(404).send('Watchlist not found');
    }

    res.status(200).json(watchlist);
  }
  catch (e) {
    res.status(500).send(e);
  }
};

export const create: RequestHandler = async (req, res) => {
  try {
    //@ts-ignore
    const userId = req.user.id;

    const name = req.body.name.trim();
    const color = req.body.color;

    const watchlist = await WatchlistService.createWatchlist(name, userId, color);

    res.status(200).json(watchlist);
  }
  catch (e) {
    res.status(500).send(e);
  }
}

export const addItem: RequestHandler = async (req, res) => {
  try {
    const watchlistId = req.params.id;
    const symbolId = req.body.symbolId;

    const watchlist = await WatchlistService.updateOrCreateWatchlistItems(watchlistId, symbolId, 'add');

    res.status(200).json(watchlist);
  }
  catch (e) {
    res.status(500).send(e);
  }
}

export const removeItem: RequestHandler = async (req, res) => {
  try {
    const watchlistId = req.params.id;
    const symbolId = req.body.symbolId;

    await WatchlistService.updateOrCreateWatchlistItems(watchlistId, symbolId, 'remove');

    res.status(200).send('Item has been removed');
  }
  catch (e) {
    res.status(500).send(e);
  }
}

export const update: RequestHandler = async (req, res) => {
  try {
    const watchlistId = req.params.id;
    const name = req.body.name;
    const color = req.body.color;

    const watchlist = await WatchlistService.updateWatchlist(watchlistId, name, color);

    res.status(200).json(watchlist);
  }
  catch (e) {
    res.status(500).send(e);
  }
}

export const remove: RequestHandler = async (req, res) => {
  try {
    const watchlistId = req.params.id;

    await WatchlistService.removeWatchlist(watchlistId);

    res.status(200).send('Watchlist has been removed');
  }
  catch (e) {
    res.status(500).send(e);
  }
}