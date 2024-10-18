import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ProductPresenter from "../presenters/product.presenter";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";
import { json } from "sequelize";
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());

  try {
    const productDto = {
      type: req.body.type,
      name: req.body.name,
      price: Number(req.body.price)
    };

    const output = await usecase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  const output = await usecase.execute({});

  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(ProductPresenter.listXML(output)),
  });
});

productRoute.get("/:id", async (req: Request, res: Response) => {
  const usecase = new FindProductUseCase(new ProductRepository());
  try {
    const findDto = {
      id: req.params.id
    };

    const output = await usecase.execute(findDto);
    res.send(output);
  } catch (err) {
    res.status(404).send(err); 
  }
});

productRoute.put("/:id", async (req: Request, res: Response) => {
  const usecase = new UpdateProductUseCase(new ProductRepository());

  try {
    const updateDto = {
      id: req.params.id,
      name: req.body.name,
      price: req.body.price
    };

    const output = await usecase.execute(updateDto);
    res.send(output);
  } catch (err) {
    res.status(400).send(err);
  }
});
