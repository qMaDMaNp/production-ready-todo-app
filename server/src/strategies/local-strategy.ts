import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const userList = [
    { id: 1, username: 'pewpew', password: 'passwordBebe' },
    { id: 2, username: 'pewpew1', password: 'passwordBebe1' },
    { id: 3, username: 'pewpew2', password: 'passwordBebe2' }
];

passport.serializeUser((user, done) => {
    console.log('serializeUser', user)
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    console.log('deserializeUser', userId)
    try {
        const findUser = userList.find(x => x.id === userId);

        if (!findUser) throw new Error('Bad Credentials');
    
        done(null, findUser);
    }
    catch(e) {
        done(e, null);
    }
});


export default passport.use(
    new LocalStrategy((username, password, done) => {
        try {
            const findUser = userList.find(x => x.username === username);

            if (!findUser || findUser.password !== password) throw new Error('Bad Credentials');

            done(null, findUser);
        }
        catch (e) {
            done(e, null);
        }
    })
);