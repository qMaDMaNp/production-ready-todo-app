import jwt from 'jsonwebtoken';

import { Token } from '@db/models/Token';

class TokenService {
    generateToken(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY as string, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY as string, { expiresIn: '30d' });

        return { accessToken, refreshToken };
    }

    validateAccessToken(accessToken: string) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY as string);

            return userData;

        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(refreshToken: string) {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY as string);

            return userData;

        } catch (e) {
            return null;
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await Token.findOne({ user: userId });
        
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            await tokenData.save();
            
            return tokenData;
        }

        const token = await Token.create({ user: userId, refreshToken });

        return token;
    }

    async findToken(refreshToken: string) {
        try {
            const token = await Token.findOne({ refreshToken });

            return token;
        } catch (e) {
            throw e;
        }
    }

    async removeToken(refreshToken: string) {
        const tokenData = await Token.deleteOne({ refreshToken });

        return tokenData;
    }
}

export default new TokenService();