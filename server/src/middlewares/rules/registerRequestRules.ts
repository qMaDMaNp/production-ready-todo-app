import { body } from 'express-validator';

export const registerRequestRules = (req, res) => {
    return [
        body('email').isEmail(),
        body('password').isLength({ min: 6, max: 32 })
    ]
};

export default registerRequestRules;