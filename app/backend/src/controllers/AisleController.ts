import { Request, Response } from 'express';
import { StatusCodes } from '../utils/StatusCode';
import { AisleService } from '../services/AisleService';

export class AisleController {
  private aisleService: AisleService;

  constructor(aisleService: AisleService = new AisleService()) {
    this.aisleService = aisleService;
  }

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.aisleService.findAll();
    return res.status(StatusCodes[status]).json(data);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.aisleService.findById(+id);
    return res.status(StatusCodes[status]).json(data);
  }

  public async findBySector(req: Request, res: Response): Promise<Response> {
    const { sectorId } = req.params;
    const { status, data } = await this.aisleService.findBySector(+sectorId);
    return res.status(StatusCodes[status]).json(data);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { status, data } = await this.aisleService.create(body);
    return res.status(StatusCodes[status]).json(data);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const { status, data } = await this.aisleService.update(+id, body);
    return res.status(StatusCodes[status]).json(data);
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.aisleService.remove(+id);
    return res.status(StatusCodes[status]).json(data);
  }
}
