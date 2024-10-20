import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
    .post("/product")
    .send({
      type: "a",
      name: "Product A",
      price: 12
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product A");
    expect(response.body.price).toBe(12);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product A",
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app)
    .post("/product")
    .send({
      type: "a",
      name: "Product A",
      price: 12
    });
    expect(response.status).toBe(200);
    
    const response2 = await request(app)
    .post("/product")
    .send({
      type: "a",
      name: "Product AA",
      price: 20
    });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    
    const product1 = listResponse.body.products[0];
    expect(product1.name).toBe("Product A");
    expect(product1.price).toBe(12);

    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product AA");
    expect(product2.price).toBe(20);

    const listResponseXML = await request(app)
    .get("/product")
    .set("Accept", "application/xml")
    .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Product A</name>`);
    expect(listResponseXML.text).toContain(`<price>12</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Product AA</name>`);
    expect(listResponseXML.text).toContain(`<price>20</price>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });

  it("should find a product by id", async () => {
    const response = await request(app)
    .post("/product")
    .send({
      type: "a",
      name: "Product A",
      price: 12
    });
    expect(response.status).toBe(200);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    
    const product1 = listResponse.body.products[0];
    const id = product1.id;

    const productResponse = await request(app).get(`/product/${id}`).send();
    expect(productResponse.status).toBe(200);
    expect(productResponse.body.name).toBe("Product A");
    expect(productResponse.body.price).toBe(12);
  });

  it("should update a product by id", async () => {
    const response = await request(app)
    .post("/product")
    .send({
      type: "a",
      name: "Product A",
      price: 12
    });
    expect(response.status).toBe(200);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    
    const product1 = listResponse.body.products[0];
    const id = product1.id;

    const productResponse = await request(app).get(`/product/${id}`).send();
    expect(productResponse.status).toBe(200);
    expect(productResponse.body.name).toBe("Product A");
    expect(productResponse.body.price).toBe(12);

    const updateRequest = await request(app)
    .put(`/product/${id}`)
    .send({
      type: "a",
      name: "Product B",
      price: 45
    });
    expect(updateRequest.status).toBe(200);

    const updateResponse = await request(app).get(`/product/${id}`).send();
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe("Product B");
    expect(updateResponse.body.price).toBe(45);
  });
});
