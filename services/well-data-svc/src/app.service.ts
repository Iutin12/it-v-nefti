import { Injectable } from '@nestjs/common'
import { PrismaService } from './db/prisma.service'
import { Well } from '@prisma/client'

export type CreateWellDto = {
  name: string
}

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<Well> {
    return this.prisma.well.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    })
  }

  async create(newWell: CreateWellDto): Promise<Well> {
    return this.prisma.well.create({
      data: {
        name: newWell.name,
      },
    })
  }

  async getAll(): Promise<Well[]> {
    return this.prisma.well.findMany()
  }
}
