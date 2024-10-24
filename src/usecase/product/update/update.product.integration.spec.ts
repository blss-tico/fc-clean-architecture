import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const productUsecase = new UpdateProductUseCase(productRepository);

    const product = new Product("123", "Product A", 12);
    await productRepository.create(product);

    const input = {
      id: "123",
      name: "Product Z",
      price: 30
    };

    const output = {
      id: "123",
      name: "Product Z",
      price: 30
    };

    const result = await productUsecase.execute(input);
    expect(result).toEqual(output);
  });
});
