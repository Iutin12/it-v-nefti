import { Module } from '@nestjs/common'
import { OilfieldController } from './oilfield.controller'
import { OilfieldService } from './oilfield.service'
import { PrismaService } from 'src/db/prisma.service'

@Module({ imports: [], controllers: [OilfieldController], providers: [OilfieldService, PrismaService] })
export class OilfieldModule {}
