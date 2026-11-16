const API_URL = process.env.API_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;

const USAGE = `Uso:
  npm run start GET products
  npm run start GET products/<productId>
  npm run start POST products <title> <price> <category>
  npm run start DELETE products/<productId>`;


const parseArgs = (args) => {
    const [method = '', path = '', ...rest] = args;
    const [resource, id] = path.split('/');

    if (resource?.toLowerCase() !== 'products') {
        throw new Error(`Recurso desconocido: "${path}"`);
    }

    switch (method.toUpperCase()) {
        case 'GET':
            return { method: 'GET', endpoint: id ? `/products/${id}` : '/products' };

        case 'POST': {
            const [title, price, category] = rest;
            if (!title || !price || !category) {
                throw new Error('POST requiere <title> <price> <category>');
            }
            if (Number.isNaN(Number(price))) {
                throw new Error(`El precio debe ser un número: "${price}"`);
            }
            return {
                method: 'POST',
                endpoint: '/products',
                body: { title, price: Number(price), category }
            };
        }

        case 'DELETE':
            if (!id) throw new Error('DELETE requiere products/<productId>');
            return { method: 'DELETE', endpoint: `/products/${id}` };

        default:
            throw new Error(`Método no soportado: "${method}"`);
    }
};


const request = async ({ method, endpoint, body }) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        ...(body && {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${text}`);
    }
    return data;
};


export const runCli = async (args) => {
    try {
        const command = parseArgs(args);
        const data = await request(command);

        if (data === null) {
            console.log('No se encontró ningún resultado.');
        } else {
            console.log(data);
        }
    } catch (error) {
        const message = error.cause?.code === 'ECONNREFUSED' ? `No se pudo conectar a ${API_URL}` : error.message;
        console.error(`Error: ${message}\n\n${USAGE}`);
        process.exitCode = 1;
    }
};
