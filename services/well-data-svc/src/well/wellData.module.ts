import { Module } from '@nestjs/common'
import { WellDataController } from './wellData.controller'
import { WellDataService } from './wellData.service'
import { PrismaService } from '../db/prisma.service'

@Module({
  imports: [],
  controllers: [WellDataController],
  providers: [WellDataService, PrismaService],
})
export class WellDataModule {}
