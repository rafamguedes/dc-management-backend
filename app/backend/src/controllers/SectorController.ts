import { Request, Response } from "express";
import { StatusCodes } from "../utils/StatusCode";
import { SectorService } from "../services/SectorService";

export class SectorController {
  private sectorService: SectorService;

  constructor(sectorService: SectorService = new SectorService()) {
    this.sectorService = sectorService;
  }

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.sectorService.findAll();
    return res.status(StatusCodes[status]).json(data);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.sectorService.findById(+id);
    return res.status(StatusCodes[status]).json(data);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { status, data } = await this.sectorService.create(body);
    return res.status(StatusCodes[status]).json(data);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const { status, data } = await this.sectorService.update(+id, body);
    return res.status(StatusCodes[status]).json(data);
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.sectorService.remove(+id);
    return res.status(StatusCodes[status]).json(data);
  }
}