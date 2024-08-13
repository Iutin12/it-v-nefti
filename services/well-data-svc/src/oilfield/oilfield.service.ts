import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/db/prisma.service'
import { CreateOilfieldDto, CreateWellDto, OilfieldDto, OilfieldWithWell, WellDto } from './oilfield.dto'
import { field } from '@prisma/client'

@Injectable()
export class OilfieldService {
  constructor(private readonly prisma: PrismaService) {}

  async getOilfieldsForUser(): Promise<field[]> {
    return await this.prisma.field.findMany()
  }

  async getOilfieldWells(oilfieldId: string): Promise<WellDto[]> {
    return await this.prisma.well.findMany({
      where: {
        field_id: {
          equals: oilfieldId,
        },
      },
    })
  }

  async create(newOilfield: CreateOilfieldDto): Promise<OilfieldDto> {
    return this.prisma.field.create({
      data: {
        field_name: newOilfield.name,
      },
    })
  }

  async linkWell(createWellDto: CreateWellDto): Promise<OilfieldWithWell> {
    const well = await this.prisma.well.create({
      data: {
        well_number: createWellDto.wellName,
        field_id: createWellDto.oilfieldId,
      },
    })

    this.prisma.field.update({
      where: {
        id: createWellDto.oilfieldId,
      },
      data: {
        wells: {
          connect: {
            id: well.id,
          },
        },
      },
    })

    return this.prisma.field_wells.create({
      data: {
        field_id: createWellDto.oilfieldId,
        well_id: well.id,
      },
      select: {
        field: true,
        well: true,
      },
    })
  }
}
