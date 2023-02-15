import app from "$/main.ts";
import { assertEquals } from "testing";

Deno.test("If url main must return status 200", async () => {
  const res = await app.request("http://localhost:8000/");

  assertEquals(200, res.status);
});