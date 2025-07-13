import { Request, Response } from 'express';
import { StatusCodes } from '../utils/StatusCode';
import { SlotService } from '../services/SlotService';

export class SlotController {
  private slotService: SlotService;

  constructor(slotService: SlotService = new SlotService()) {
    this.slotService = slotService;
  }

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.slotService.findAll();
    return res.status(StatusCodes[status]).json(data);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.slotService.findById(+id);
    return res.status(StatusCodes[status]).json(data);
  }

  public async findByAisle(req: Request, res: Response): Promise<Response> {
    const { aisleId } = req.params;
    const { status, data } = await this.slotService.findByAisle(+aisleId);
    return res.status(StatusCodes[status]).json(data);
  }

  public async findByStatus(req: Request, res: Response): Promise<Response> {
    const { status: slotStatus } = req.params;
    const { status, data } = await this.slotService.findByStatus(slotStatus as any);
    return res.status(StatusCodes[status]).json(data);
  }

  public async findByFloor(req: Request, res: Response): Promise<Response> {
    const { floor } = req.params;
    const { status, data } = await this.slotService.findByFloor(+floor);
    return res.status(StatusCodes[status]).json(data);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { status, data } = await this.slotService.create(body);
    return res.status(StatusCodes[status]).json(data);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { id } = req.params;
    const { status, data } = await this.slotService.update(+id, body);
    return res.status(StatusCodes[status]).json(data);
  }

  public async updateStatus(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status: newStatus } = req.body;
    const { status, data } = await this.slotService.updateStatus(+id, newStatus);
    return res.status(StatusCodes[status]).json(data);
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.slotService.remove(+id);
    return res.status(StatusCodes[status]).json(data);
  }
}
