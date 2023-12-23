import { Model, Document } from "mongoose";
import { Request, Response } from "express";

export class GenericController<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const items = await this.model.find();
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const item = await this.model.findById(req.params.id);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const item = await this.model.create(req.body);
      return res.status(201).json(item);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const item = await this.model.updateOne({ _id: req.params.id }, req.body);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const item = await this.model.deleteOne({ _id: req.params.id });
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
