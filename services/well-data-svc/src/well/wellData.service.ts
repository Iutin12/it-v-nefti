import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import { well } from '@prisma/client'

export type CreateWellDto = {
  name: string
}

@Injectable()
export class WellDataService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<well> {
    return this.prisma.well.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    })
  }

  async create(newWell: CreateWellDto): Promise<well> {
    return this.prisma.well.create({
      data: {
        name: newWell.name,
      },
    })
  }

  async getAll(): Promise<well[]> {
    return this.prisma.well.findMany()
  }
}
