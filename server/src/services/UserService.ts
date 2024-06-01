import bcrtpt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { User, UserDocument } from '@db/models/User';
import TokenService from '@services/TokenService';
import UserResource from '@resources/UserResource';
import { ApiError } from '@lib/BaseError';

interface UserResponse {
    accessToken: string;
    refreshToken: string;
    user: UserResource;
}

class UserService {
    async registration(email: string, password: string): Promise<UserResponse> {
        const user = await User.findOne({ email });

        if (user) {
            throw ApiError.BadRequest(`User with email ${email} already exists`);
        }

        const hashPassword = await bcrtpt.hash(password, 6);
        const activationLink = uuidv4();
        const newUser = await User.create({ email, password: hashPassword, activationLink });

        // await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userResource = new UserResource(newUser);

        // const userResource = { email: newUser.email, id: newUser._id, isActivated: newUser.isActivated };
        const tokens = TokenService.generateToken({ ...userResource });

        await TokenService.saveToken(userResource.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userResource
        };
    }

    async activate(activationLink: string) {
        const user = await User.findOne({ activationLink });

        if (!user) {
            throw ApiError.BadRequest('Invalid activation link');
        }

        user.isActivated = true;

        await user.save();
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ email });

        if (!user) {
            throw ApiError.BadRequest('User with this email was not found');
        }

        const isMatch = await bcrtpt.compare(password, user.password);

        if (!isMatch) {
            throw ApiError.BadRequest('Invalid password');
        }

        const userResource = new UserResource(user);
        const tokens = TokenService.generateToken({ ...userResource });

        await TokenService.saveToken(userResource.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userResource
        };
    }

    async logout(refreshToken: string) {
        const token = await TokenService.removeToken(refreshToken);

        return token
    }

    async refresh(refreshToken: string) {

        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = TokenService.validateRefreshToken(refreshToken);

        if (typeof userData === 'string') {
            throw ApiError.InvalidRefreshTokenData('Invalid refresh token data');
        }

        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError('User is not authorized');
        }

        const user = await User.findById(userData.id)
        const userResource = new UserResource(user);
        const tokens = TokenService.generateToken({ ...userResource });

        await TokenService.saveToken(userResource.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userResource
        };

    }

    async getUsers(): Promise<UserDocument[]> {
        try {
            const users = await User.find();

            return users;

        } catch (e) {
            throw e;
        }
    }

    async getUser(id: string): Promise<UserDocument | null> {
        try {
          const user = await User.findById(id);

          return user;
          
        } catch (e) {
          throw e;
        }
      }
}

export default new UserService();