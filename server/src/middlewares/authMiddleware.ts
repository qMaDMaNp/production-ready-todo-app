//@ts-nocheck
import { RequestHandler, Request } from 'express';
import * as jwt from 'jsonwebtoken';

import { ApiError } from '../lib/BaseError';
import TokenService from '../services/TokenService';

import registerRequestRules from './rules/registerRequestRules';


export const authMiddleware: RequestHandler = async (req: {user?: any}, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    
    next();
  } 
  catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}

export const registerMiddleware: RequestHandler = async (req, res, next) => {
  try {
    await validator(registerRequestRules(req, res))(req);
    next();
  }
  catch (e) {
    res.status(500).send(e);
  }
}

// export const isUser: RequestHandler = (req, res, next) => {
//   const token = req.get('Authorization');

//   if (!token) return res.status(401).send('Please login');

//   try {
//     const authorizationHeader = req.headers.authorization;
//     if (!authorizationHeader) return res.status(401).send('Please login');

//     jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
//       if (err) return res.status(401).send('Incorrect token');

//       res.userId = decoded._id;
//       return next();
//     });
//   }
//   catch (e) {
//     res.status(500).send(e);
//   }
// }

// export const isAdmin: RequestHandler = (req, res, next) => {
//   const token = req.get('Authorization');

//   if (!token) return res.status(401).send('Please login');

//   try {
//     jwt.verify(token, process.env.JWT_KEY_ADMIN, (err, decoded) => {
//       if (err) return res.status(401).send('Incorrect token');

//       res.supportId = decoded.id;
//       return next();
//     });
//   }
//   catch (e) {
//     res.status(500).send(e);
//   }
// }

export default {
  authMiddleware,
  registerMiddleware
  // isUser,
  // isAdmin
}