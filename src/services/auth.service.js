import jwt from 'jsonwebtoken';
import { HttpError } from '../config/errors.js';

export const login = ({ email, password } = {}) => {
    if (!email || !password) {
        throw new HttpError(400, 'Se requieren "email" y "password"');
    }

    const validUser = email === process.env.AUTH_EMAIL && password === process.env.AUTH_PASSWORD;
    if (!validUser) {
        throw new HttpError(401, 'Credenciales inválidas');
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN ?? '1h'
    });
    return { token: `Bearer ${token}` };
};
