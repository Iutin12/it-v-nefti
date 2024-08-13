import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post } from '@nestjs/common'
import { WellDataService, CreateWellDto } from './wellData.service'
import { Well } from '@prisma/client'

// todo: add validation
@Controller()
export class WellDataController {
  constructor(private readonly appService: WellDataService) {}

  @Get()
  async getAll(): Promise<Well[]> {
    try {
      const well = await this.appService.getAll()

      if (!well) {
        throw new InternalServerErrorException('Internal server error')
      }

      return well
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal server error')
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Well> {
    try {
      const well = await this.appService.getById(id)

      if (!well) {
        throw new NotFoundException('Well not found')
      }

      return well
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal server error')
    }
  }

  @Post()
  async create(@Body() createWellDto: CreateWellDto): Promise<Well> {
    try {
      const well = await this.appService.create(createWellDto)
      return well
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal server error')
    }
  }
}
