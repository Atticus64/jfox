import assert from "node:assert"
import app from "../src/main.js";
import request from "supertest"

Deno.test('route / must return status 200', async () => {

  request("http://localhost:8000")
    .get('/')
    .expect(200)
    .expect("Welcome to the Dinosaur API!")

});
