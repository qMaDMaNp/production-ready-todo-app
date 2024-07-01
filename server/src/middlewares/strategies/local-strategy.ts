import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { User } from '@db/models/User';
import { ApiError } from '@lib/BaseError';


passport.serializeUser((user: any, done) => {
    console.log('serializeUser', user.id)
    done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
    console.log('deserializeUser', userId)
    done(null, { id: userId });
});

export default passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            console.log('Login attempt')
            const user = await User.findOne({ email });

            if (!user) {
                throw ApiError.BadRequest('User with this email was not found');
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw ApiError.BadRequest('Invalid password');
            }

            done(null, user);
        }
        catch (e) {
            done(e, null);
        }
    })
);