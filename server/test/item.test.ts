import supertest from "supertest"
import app from "../src/server";
import mongoose from "mongoose";
import jest from "jest";
import { ConsoleWriter } from "istanbul-lib-report";

const request = supertest(app)
describe('puppeteer tests', () => {

    afterEach(() => {
        mongoose.connection.close();
      });
      
    test("adds 1 + 2 to equal 3", async () => {
         const response = await request.get("/api/list");
         console.log(response.body);
         
      }, );
})
