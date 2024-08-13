import { Module } from '@nestjs/common'
import { PrismaService } from './db/prisma.service'
import { OilfieldModule } from './oilfield/oilfield.module'
import { WellDataModule } from './well/wellData.module'

@Module({
  imports: [OilfieldModule, WellDataModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
