import supertest from "supertest";
import app from "../src/server";
import mongoose from "mongoose";

const request = supertest(app)
describe('list API testing', () => {
  
  let listIDUpdate = null;
  let listIDRemove = null;

  beforeAll(async () => {
    let response;
    response = await request.post("/api/list/add").send({title: "update"});
    listIDUpdate = response.body.id;
    response = await request.post("/api/list/add").send({title: "remove"});
    listIDRemove = response.body.id;
  })

   afterAll(async () => {
      await mongoose.connection.db.dropDatabase();
      mongoose.connection.close();
    });
      
    test("add list", async () => {

         const response = await request.post("/api/list/add")
         .send({
           title: "add list"
         });
         expect(response.statusCode).toBe(200);
      });
    
    test("update list", async () => {
      const response = await request.post("/api/list/update")
      .send({
        id: listIDUpdate,
        title: "updated"
      });
      expect(response.statusCode).toBe(200);
    }, );

    test("remove list", async () => {
      const response = await request.post("/api/list/delete")
      .send({
        id: listIDRemove,
      });
      expect(response.statusCode).toBe(200);
    }, );

    test("view a list", async () => {
      const response = await request.get(`/api/list/${listIDUpdate}`);
      expect(response.statusCode).toBe(200);
    }, );

    test("view all list", async () => {
      const response = await request.get(`/api/list`);
      expect(response.statusCode).toBe(200);
    }, );
})
