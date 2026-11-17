# Proyecto Final - Node.js (Talento Tech)

API REST para administrar el catálogo de productos de la tienda. Los datos se guardan en **Firestore (Firebase)** y las rutas de productos están protegidas con **JWT**.

## Estructura

```
index.js                 # Punto de entrada: configuración de express, CORS, body-parser, rutas y 404
vercel.json              # Configuración de despliegue en Vercel
src/
  config/                # Conexión a Firebase y clase de errores HTTP
  routes/                # products.routes.js, auth.routes.js
  controllers/           # Reciben la petición y devuelven la respuesta
  services/              # Lógica de negocio y validaciones
  models/                # Acceso a la colección "products" de Firestore
  middlewares/           # Autenticación JWT, 404 y manejo de errores
```

## Instalación

```bash
npm install
cp .env.example .env     # completar con los valores reales
npm run start
```

## Endpoints

| Método | Ruta                   | Auth | Descripción                                   |
| ------ | ---------------------- | ---- | --------------------------------------------- |
| POST   | `/auth/login`          | No   | Recibe `{ email, password }` y devuelve el Bearer token |
| GET    | `/api/products`        | Sí   | Devuelve todos los productos                  |
| GET    | `/api/products/:id`    | Sí   | Devuelve el producto con el ID indicado       |
| POST   | `/api/products/create` | Sí   | Crea un producto `{ title, price, category }` |
| DELETE | `/api/products/:id`    | Sí   | Elimina el producto con el ID indicado        |

Las rutas protegidas requieren el header `Authorization: Bearer <token>`.

## Códigos de error

- **400**: body inválido o faltan campos.
- **401**: no se envió token o las credenciales del login son incorrectas.
- **403**: el token es inválido o expiró.
- **404**: la ruta no existe o el producto no se encontró.
- **500**: error interno o Firestore no responde.

## Despliegue

El proyecto se despliega en Vercel usando `vercel.json`. Las variables de `.env.example` se cargan en *Settings > Environment Variables* del proyecto en Vercel. Cada push a `master` genera un nuevo despliegue a producción.

URL de producción: https://talento-tech-node.vercel.app

Ejemplo de uso:

```bash
# 1. Obtener el token
curl -X POST https://talento-tech-node.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"<email>","password":"<password>"}'

# 2. Consultar los productos con el token devuelto
curl https://talento-tech-node.vercel.app/api/products \
  -H "Authorization: Bearer <token>"
```
