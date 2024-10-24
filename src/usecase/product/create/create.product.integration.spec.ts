import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const productUsecase = new CreateProductUseCase(productRepository);

    // const product = new Product("123", "Product A", 12);
    // await productRepository.create(product);

    const input = {
      type: "a",
      name: "Product A",
      price: 12
    };

    const output = {
      name: "Product A",
      price: 12
    };

    const result = await productUsecase.execute(input);
    const resultData = {
      name: result.name,
      price: result.price
    }

    expect(resultData).toEqual(output);
  });
});
