import { Injectable } from '@nestjs/common'
import { Oilfield, Well } from '@prisma/client'
import { PrismaService } from 'src/db/prisma.service'

export type CreateOilfieldDto = {
  name: string
}

export type CreateWellDto = {
  wellName: string
  oilfieldId: string
}

export type OilfieldWithWell = {
  oilfield: Oilfield
  well: Well
}

@Injectable()
export class OilfieldService {
  constructor(private readonly prisma: PrismaService) {}

  async getOilfieldsForUser(): Promise<Oilfield[]> {
    return await this.prisma.oilfield.findMany()
  }

  async getOilfieldWells(oilfieldId: string): Promise<Well[]> {
    return await this.prisma.well.findMany({
      where: {
        oilfieldId: {
          equals: oilfieldId,
        },
      },
    })
  }

  async create(newOilfield: CreateOilfieldDto): Promise<Oilfield> {
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
        oilfieldId: createWellDto.oilfieldId,
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

    return this.prisma.oilfieldWells.create({
      data: {
        oilfieldId: createWellDto.oilfieldId,
        wellId: well.id,
      },
      select: {
        oilfield: true,
        well: true,
      },
    })
  }
}
