import { Injectable } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { oilfield, well } from '@prisma/client'
import { PrismaService } from 'src/db/prisma.service'

export class CreateOilfieldDto {
  @ApiProperty()
  name: string
}

export class CreateWellDto {
  @ApiProperty()
  wellName: string
  @ApiProperty()
  oilfieldId: string
}

export class OilfieldWithWell {
  @ApiProperty()
  oilfield: oilfield
  @ApiProperty()
  well: well
}

@Injectable()
export class OilfieldService {
  constructor(private readonly prisma: PrismaService) {}

  async getOilfieldsForUser(): Promise<oilfield[]> {
    return await this.prisma.oilfield.findMany()
  }

  async getOilfieldWells(oilfieldId: string): Promise<well[]> {
    return await this.prisma.well.findMany({
      where: {
        oilfield_id: {
          equals: oilfieldId,
        },
      },
    })
  }

  async create(newOilfield: CreateOilfieldDto): Promise<oilfield> {
    return this.prisma.oilfield.create({
      data: {
        name: newOilfield.name,
      },
    })
  }

  async linkWell(createWellDto: CreateWellDto): Promise<OilfieldWithWell> {
    const well = await this.prisma.well.create({
      data: {
        name: createWellDto.wellName,
        oilfield_id: createWellDto.oilfieldId,
      },
    })

    this.prisma.oilfield.update({
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

    return this.prisma.oilfield_wells.create({
      data: {
        oilfield_id: createWellDto.oilfieldId,
        well_id: well.id,
      },
      select: {
        oilfield: true,
        well: true,
      },
    })
  }
}
