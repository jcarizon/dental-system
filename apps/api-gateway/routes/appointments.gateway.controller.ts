import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtAuthGuard } from 'apps/auth/guards/jwt-auth.guard';
import { Response, Request } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller('appointments') // frontend base path
@UseGuards(JwtAuthGuard)
export class AppointmentsGatewayController {
  private readonly appointmentsServiceUrl =
    'http://appointments:3003/appointments';

  constructor(private readonly httpService: HttpService) {}

  @Post()
  async create(@Req() req: Request, @Body() dto: any, @Res() res: Response) {
    const jwt = req.headers.authorization;
    const result = await firstValueFrom(
      this.httpService.post(`${this.appointmentsServiceUrl}`, dto, {
        headers: { Authorization: jwt },
      }),
    );
    return res.status(result.status).json(result.data);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const jwt = req.headers.authorization;
    const result = await firstValueFrom(
      this.httpService.get(`${this.appointmentsServiceUrl}`, {
        headers: { Authorization: jwt },
      }),
    );
    return res.status(result.status).json(result.data);
  }

  @Get(':id')
  async findById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const jwt = req.headers.authorization;
    const result = await firstValueFrom(
      this.httpService.get(`${this.appointmentsServiceUrl}/${id}`, {
        headers: { Authorization: jwt },
      }),
    );
    return res.status(result.status).json(result.data);
  }

  @Get('health')
  async health(@Res() res: Response) {
    const result = await firstValueFrom(
      this.httpService.get(`${this.appointmentsServiceUrl}/health`),
    );
    return res.status(result.status).json(result.data);
  }
}
