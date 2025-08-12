import { validateToken } from "../configs/jwt.js";
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../configs/util.js';

export const validateSession = async (req, res, next) => {

    try {
        if (!req.headers.authorization)
            next(res.status(401).json({ message: "No autorizado para consultar", code: 1 }));

        const token = (req.headers.authorization).startsWith('Bearer ') ? req.headers.authorization.slice(7) : null;
        if (token === null)
            next(res.status(401).json({ message: "Falta el token", code: 1 }));

        jwt.verify(
            token,
            JWT_KEY,
            (err, decoded) => {
                if (err)
                    next(res.status(400).json({ message: "Token no valido", code: 2 }));
                
                req.username = decoded.username;
                req.email = decoded.email;
                next();
            }
        );
    } catch (e) {
        console.error(e.message)
        next(res.status(400).json({ message: "Algo ha fallado", code: 2 }));
    }

}