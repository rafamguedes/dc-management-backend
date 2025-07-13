import { Request, Response } from 'express';
import { StatusCodes } from '../utils/StatusCode';
import { PalletService } from '../services/PalletService';

export class PalletController {
  private palletService: PalletService;

  constructor(palletService: PalletService = new PalletService()) {
    this.palletService = palletService;
  }

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.palletService.findAll();
    return res.status(StatusCodes[status]).json(data);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.palletService.findById(+id);
    return res.status(StatusCodes[status]).json(data);
  }

  public async findBySlot(req: Request, res: Response): Promise<Response> {
    const { slotId } = req.params;
    const { status, data } = await this.palletService.findBySlot(+slotId);
    return res.status(StatusCodes[status]).json(data);
  }

  public async findByType(req: Request, res: Response): Promise<Response> {
    const { type } = req.params;
    const { status, data } = await this.palletService.findByType(type as 'master' | 'single');
    return res.status(StatusCodes[status]).json(data);
  }

  public async findByQrCode(req: Request, res: Response): Promise<Response> {
    const { qrCode } = req.params;
    const { status, data } = await this.palletService.findByQrCode(qrCode);
    return res.status(StatusCodes[status]).json(data);
  }

  public async findByQrCodeSmall(req: Request, res: Response): Promise<Response> {
    const { qrCodeSmall } = req.params;
    const { status, data } = await this.palletService.findByQrCodeSmall(qrCodeSmall);
    return res.status(StatusCodes[status]).json(data);
  }

  public async findUnassigned(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.palletService.findUnassigned();
    return res.status(StatusCodes[status]).json(data);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { type, slotId, qrCode, qrCodeSmall } = req.body;
    const { status, data } = await this.palletService.create({
      type,
      slotId,
      qrCode,
      qrCodeSmall,
    });
    return res.status(StatusCodes[status]).json(data);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { type, slotId, qrCode, qrCodeSmall } = req.body;
    const { status, data } = await this.palletService.update(+id, {
      type,
      slotId,
      qrCode,
      qrCodeSmall,
    });
    return res.status(StatusCodes[status]).json(data);
  }

  public async assignToSlot(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { slotId } = req.body;
    const { status, data } = await this.palletService.assignToSlot(+id, slotId);
    return res.status(StatusCodes[status]).json(data);
  }

  public async unassignFromSlot(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.palletService.unassignFromSlot(+id);
    return res.status(StatusCodes[status]).json(data);
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.palletService.remove(+id);
    return res.status(StatusCodes[status]).json(data);
  }
}
