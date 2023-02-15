import { Hono } from "hono";
import { logger } from "hono_middleware"
import { serve } from "std/http/server.ts";

const app = new Hono()

app.use("*", logger());

app.get('/', (c) => c.text('Hello! Hono!'))

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) await serve(app.fetch);

export default app;
