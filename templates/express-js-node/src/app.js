import express from "express";
import path from "path";
import url from "url";

import { loadApiEndpoints } from "./controllers/api";

// Create Express server
const app = express();

// Express configuration
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.set("port", process.env.PORT ?? 3000);
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

loadApiEndpoints(app);

export default app;
