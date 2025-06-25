import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';

import { SERVICES } from 'libs/constants/service-map';

import { AuthGatewayController } from '../routes/auth.gateway.controller';
import { UsersGatewayController } from '../routes/users.gateway.controller';
import { AppointmentsGatewayController } from '../routes/appointments.gateway.controller';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: SERVICES.AUTH,
        transport: Transport.TCP,
        options: { port: 3000 }, // TCP port of Auth microservice
      },
      {
        name: SERVICES.USERS,
        transport: Transport.TCP,
        options: { port: 3101 }, // TCP port of Users microservice
      },
      {
        name: SERVICES.APPOINTMENTS,
        transport: Transport.TCP,
        options: { port: 3003 }, // TCP port of Appointments microservice
      },
    ]),
  ],
  controllers: [
    AuthGatewayController,
    UsersGatewayController,
    AppointmentsGatewayController,
  ],
})
export class AppModule {}
