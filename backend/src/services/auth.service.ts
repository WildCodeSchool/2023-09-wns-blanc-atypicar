import { getUserByEmail } from "./user.service";
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export function verifyToken(token: string) {
    if (process.env.JWT_SECRET_KEY === undefined) {
        throw new Error();
    }

    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

export async function register(email: string, password: string): Promise<string | Error> {    
    try {
        const user = await getUserByEmail(email);
        if (await argon2.verify(user.password, password)) {
            const token = signJwt({
                email: user.email,
                role: user.role
            })
            return token;

        } else {
            throw new Error();
        }
    } catch (error) {
        throw new Error("Invalid Auth");
    }
}


export function signJwt(payload: any) {
    if (process.env.JWT_SECRET_KEY === undefined) {
        throw new Error();
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60,
    });
}