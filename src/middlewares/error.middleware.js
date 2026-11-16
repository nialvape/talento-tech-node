// Express identifica el manejador de errores por tener 4 parámetros
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
    // JSON mal formado en el body
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'El body no es un JSON válido' });
    }

    // Errores esperados lanzados por los servicios (400, 401, 404...)
    if (err.status) {
        return res.status(err.status).json({ error: err.message });
    }

    // Errores no controlados (por ejemplo Firestore no responde)
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
};
