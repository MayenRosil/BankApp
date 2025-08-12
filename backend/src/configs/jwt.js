import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../configs/util.js';

export const generateToken = (payload) => {
    return jwt.sign(
        payload,
        JWT_KEY,
        { expiresIn: 60 * 60 }
    );
}

export const validateToken = (token) => {
    return jwt.verify(
        token,
        JWT_KEY,
        (err, decoded) => {
            
        }
    );
} 