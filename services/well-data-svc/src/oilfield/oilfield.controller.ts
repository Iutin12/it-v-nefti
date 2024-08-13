import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post } from '@nestjs/common'
import { CreateOilfieldDto, CreateWellDto, OilfieldService, OilfieldWithWell } from './oilfield.service'
import { Oilfield, Well } from '@prisma/client'

@Controller('oilfield')
export class OilfieldController {
  constructor(private readonly oilfieldService: OilfieldService) {}

  @Get('/')
  async getOilfieldsForUser(): Promise<Oilfield[]> {
    try {
      const oifields = await this.oilfieldService.getOilfieldsForUser()
      return oifields
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal server error')
    }
  }

  @Get('/wells/:oilfieldId')
  async getOilfieldWells(@Param() params: { oilfieldId: string }): Promise<Well[]> {
    const oilfieldId = params.oilfieldId

    if (!oilfieldId) {
      throw new BadRequestException('oilfieldId not provided')
    }

    try {
      const wells = await this.oilfieldService.getOilfieldWells(oilfieldId)
      return wells
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal server error')
    }
  }

  @Post()
  async create(@Body() createOilfieldDto: CreateOilfieldDto): Promise<Oilfield> {
    try {
      const oilfield = await this.oilfieldService.create(createOilfieldDto)
      return oilfield
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal server error')
    }
  }

  @Post('/linkWell')
  async linkWell(@Body() createWellDto: CreateWellDto): Promise<OilfieldWithWell> {
    try {
      const oilfieldWithWell = await this.oilfieldService.linkWell(createWellDto)
      return oilfieldWithWell
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal server error')
    }
  }
}
