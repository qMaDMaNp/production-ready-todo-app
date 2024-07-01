import { z } from 'zod';
import { User } from '@db/models/User';
import { ApiError } from '@lib/BaseError';


export default async (req, res, next) => {
    try {
        const registerRequestSchema = z.object({
            email: z.string().email({ message: "Invalid email address" }),
            password: z.string().min(8, { message: "Password must be at least 8 characters long" })
        });

        const result = registerRequestSchema.safeParse(req.body);

        if (!result.success) return res.status(422).json(result.error.issues);
        
        const user = await User.findOne({ email: result.data.email });

        if (user) throw ApiError.BadRequest(`User with email ${result.data.email} already exists`);

        next();
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}