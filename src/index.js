import 'dotenv/config';
import app from './server.js';
import { runCli } from './cli.js';

const PORT = process.env.PORT ?? 3000;
const args = process.argv.slice(2);

const server = app.listen(PORT, async () => {
    console.log(`Server corriendo en http://localhost:${PORT}`);

    if (args.length > 0) {
        await runCli(args);
        server.close();
    }
});
