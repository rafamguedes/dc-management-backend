import { Request, Response } from 'express';
import { StatusCodes } from '../utils/StatusCode';
import { ProductService } from '../services/ProductService';

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService = new ProductService()) {
    this.productService = productService;
  }

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.productService.findAll();
    return res.status(StatusCodes[status]).json(data);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.productService.findById(+id);
    return res.status(StatusCodes[status]).json(data);
  }

  public async findByCode(req: Request, res: Response): Promise<Response> {
    const { code } = req.params;
    const { status, data } = await this.productService.findByCode(code);
    return res.status(StatusCodes[status]).json(data);
  }

  public async findByUnit(req: Request, res: Response): Promise<Response> {
    const { unit } = req.params;
    const { status, data } = await this.productService.findByUnit(unit);
    return res.status(StatusCodes[status]).json(data);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { code, name, description, unit } = req.body;
    const { status, data } = await this.productService.create({
      code,
      name,
      description,
      unit,
    });
    return res.status(StatusCodes[status]).json(data);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { code, name, description, unit } = req.body;
    const { status, data } = await this.productService.update(+id, {
      code,
      name,
      description,
      unit,
    });
    return res.status(StatusCodes[status]).json(data);
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.productService.remove(+id);
    return res.status(StatusCodes[status]).json(data);
  }
}
