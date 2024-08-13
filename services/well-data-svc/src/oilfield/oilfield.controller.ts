import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post } from '@nestjs/common'
import { CreateOilfieldDto, CreateWellDto, OilfieldDto, OilfieldWithWell, WellDto } from './oilfield.dto'
import { OilfieldService } from './oilfield.service'
import { ApiResponse } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'

@Controller('oilfield')
export class OilfieldController {
  constructor(private readonly oilfieldService: OilfieldService) {}

  @ApiResponse({
    description: 'Возвращает месторождения',
    type: OilfieldDto,
    isArray: true,
  })
  @Get()
  async getOilfieldsForUser(): Promise<OilfieldDto[]> {
    try {
      const oifields = await this.oilfieldService.getOilfieldsForUser()
      return oifields
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal server error')
    }
  }

  @ApiResponse({
    description: 'Возвращает скважины для месторождения',
    type: WellDto,
    isArray: true,
  })
  @Get('/:oilfieldId/wells/')
  async getOilfieldWells(@Param() params: { oilfieldId: string }): Promise<WellDto[]> {
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

  @ApiResponse({
    description: 'Создает месторождение',
    type: OilfieldDto,
  })
  @Post()
  async create(@Body() createOilfieldDto: CreateOilfieldDto): Promise<OilfieldDto> {
    try {
      const oilfield = await this.oilfieldService.create(createOilfieldDto)
      return oilfield
    } catch (error) {
      console.log(error)

      throw new InternalServerErrorException('Internal server error')
    }
  }

  @ApiResponse({
    description: 'Создает скважину для месторождения',
    type: OilfieldWithWell,
  })
  @Post('/linkWell')
  async linkWell(@Body() createWellDto: CreateWellDto): Promise<OilfieldWithWell> {
    try {
      const oilfieldWithWell = await this.oilfieldService.linkWell(createWellDto)
      return oilfieldWithWell
    } catch (error) {
      console.log(error)

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new BadRequestException('Well with this name already exists')
          default:
            throw new InternalServerErrorException('Internal server error')
        }
      }

      throw new InternalServerErrorException('Internal server error')
    }
  }
}
