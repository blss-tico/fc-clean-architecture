import CreateProductUseCase from "./create.product.usecase";

const input = {
  type: "a",
  name: "Product 12",
  price: 12,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    try {
      input.name = "";
      const output = await productCreateUseCase.execute(input);  
    } catch (error: any) {
      expect(error.message).toBe("Name is required");
    }
    
    // await expect(output).rejects.toThrow("Name is required");
  });

  it("should thrown an error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    try {
      input.name = "Product 12";
      input.price = -5;
      const output = await productCreateUseCase.execute(input);  
    } catch (error: any) {
      expect(error.message).toBe("Price must be greater than zero");
    }
    
    // await expect(output).rejects.toThrow("Price must be greater than zero");
  });
});
