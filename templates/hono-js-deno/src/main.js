import { Hono } from "hono";
import { logger } from "hono_middleware"
import { serve } from "std/http/server.ts";
import usersJson from "../data/users.json" assert { type: "json" }

const app = new Hono()

app.use("*", logger());

app.get('/', (c) => c.text('Hello! Hono!'))

app.get('/api', (c) => {
	return c.json(
		usersJson	
	)
})
// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) await serve(app.fetch);

export default app;
