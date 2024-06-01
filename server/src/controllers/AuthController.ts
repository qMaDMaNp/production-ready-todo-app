import { RequestHandler } from 'express';
import UserService from '@services/UserService';
import { ApiError } from '@lib/BaseError';

export const login: RequestHandler = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);

      if (!userData) ApiError.BadRequest('Authentication failed');

      res.cookie("refreshToken", userData.refreshToken, { 
        maxAge: 30 * 24 * 60 * 60 * 1000 , 
        httpOnly: true,
        secure: false //when https make true
      });

      return res.json(userData);
    } 
    catch (e) {
      res.status(500).send(e);
    }
  };

  export const registration: RequestHandler = async (req, res ) => {
    try {
      const { email, password } = req.body;
      const userData = await UserService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, { 
        maxAge: 30 * 24 * 60 * 60 * 1000 , 
        httpOnly: true,
        secure: false //when https make true
      });
      
      return res.json(userData);
    } 
    catch (e) {
      res.status(500).send(e);
    }
  };

  export const logout: RequestHandler = async (req, res) => {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);

      res.clearCookie("refreshToken", { maxAge: 0, httpOnly: true });

      return res.json(token);
    } 
    catch (e) {
      res.status(500).send(e);
    }
  };