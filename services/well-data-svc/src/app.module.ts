import { Module } from '@nestjs/common'
import { PrismaService } from './db/prisma.service'
import { OilfieldModule } from './oilfield/oilfield.module'

@Module({
  imports: [OilfieldModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
