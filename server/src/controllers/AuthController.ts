import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { RequestHandler } from 'express';

import { User } from '@db/models/User';
import UserResource from '@resources/UserResource';


export const login: RequestHandler = async (req, res) => {
    res.status(200).send('Login success');
};

export const register: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const activationLink = uuidv4();
        const hashPassword = await bcrypt.hash(password, 6);

        const user = await User.create({ email, password: hashPassword, activationLink });

        // await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        req.login(user, (e) => {
            if (e) return res.status(500).send('Registration failed');

            res.status(200).send('Register success');
        })
    }
    catch (e) {
        res.status(500).send(e);
    }
};

export const logout: RequestHandler = async (req, res) => {
    req.session.destroy((e) => {
        if (e) return res.status(500).send(e);

        res.clearCookie('connect.sid', { path: '/' });
        res.status(200).send('Logout success');
    });
};

export const getUser: RequestHandler = async (req: any, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) throw new Error('Bad Credentials');

        res.status(200).json(new UserResource(user));
    }
    catch (e) {
        res.status(500).send(e);
    }
};
