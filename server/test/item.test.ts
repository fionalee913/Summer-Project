import supertest from "supertest";
import app from "../src/server";
import mongoose from "mongoose";

const request = supertest(app)
describe('item API testing', () => {
  
  let listID = null;
  let itemIDUpdate = null;
  let itemIDRemove = null;

  beforeAll(async () => {
    let response = await request.post("/api/list/add").send({title: "testlist"});
    listID = response.body.id;
    response = await request.post("/api/item/add").send({title: "update", listID});
    itemIDUpdate = response.body.id;
    response = await request.post("/api/item/add").send({title: "remove", listID});
    itemIDRemove = response.body.id;
  })

   afterAll(async () => {
      await mongoose.connection.db.dropDatabase();
      mongoose.connection.close();
    });
      
    test("add item", async () => {

         const response = await request.post("/api/item/add")
         .send({
           title: "test item",
           listID: listID
         });
         expect(response.statusCode).toBe(200);
      }, );
    
    test("update item", async () => {
      const response = await request.post("/api/item/update")
      .send({
        id: itemIDUpdate,
        listID: listID,
        title: "updated"
      });
      expect(response.statusCode).toBe(200);
    }, );

    test("remove item", async () => {
      const response = await request.post("/api/item/delete")
      .send({
        id: itemIDRemove,
        listID: listID
      });
      expect(response.statusCode).toBe(200);
    }, );

    test("view an item", async () => {
      const response = await request.get(`/api/item/${listID}/${itemIDUpdate}`);
      expect(response.statusCode).toBe(200);
    }, );
})
