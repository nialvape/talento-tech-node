import * as authService from '../services/auth.service.js';

export const login = (req, res) => {
    const result = authService.login(req.body);
    res.json(result);
};
