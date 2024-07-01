import bcrypt from 'bcrypt';

const saltRounds = 12;

class PasswordHandler {
    hash(password: string): Promise<any> {
        return bcrypt.hash(password, saltRounds);
    }

    compare(password: string, passwordHash: string): Promise<any> {
        return bcrypt.compare(password, passwordHash);
    }
}

export default new PasswordHandler();