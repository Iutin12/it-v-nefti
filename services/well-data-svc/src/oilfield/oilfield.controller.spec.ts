import { PrismaService } from 'src/db/prisma.service'
import { OilfieldController } from './oilfield.controller'
import { OilfieldService } from './oilfield.service'
import { OilfieldDto, OilfieldWithWell, WellDto } from './oilfield.dto'

describe('OilfieldController', () => {
  let oilfieldController: OilfieldController
  let oilfieldService: OilfieldService
  let prismaService: PrismaService

  beforeEach(() => {
    prismaService = new PrismaService()
    oilfieldService = new OilfieldService(prismaService)
    oilfieldController = new OilfieldController(oilfieldService)
  })

  describe('getOilfieldsForUser', () => {
    it('возвращает месторождения', async () => {
      const result: OilfieldDto[] = [{ field_name: 'test1', id: '1', created_at: new Date(), updated_at: new Date() }]
      jest.spyOn(oilfieldService, 'getOilfieldsForUser').mockImplementation(async () => result)

      expect(await oilfieldController.getOilfieldsForUser()).toBe(result)
    })
  })

  describe('getOilfieldWells', () => {
    it('возвращает скважины', async () => {
      const result: WellDto[] = [
        { well_number: 'test1', id: '1', created_at: new Date(), updated_at: new Date(), field_id: '2' },
      ]
      jest.spyOn(oilfieldService, 'getOilfieldWells').mockImplementation(async () => result)

      expect(await oilfieldController.getOilfieldWells({ oilfieldId: '2' })).toBe(result)
    })
  })

  describe('create', () => {
    it('создает месторождение', async () => {
      const result: OilfieldDto = { field_name: 'test1', id: '1', created_at: new Date(), updated_at: new Date() }
      jest.spyOn(oilfieldService, 'create').mockImplementation(async () => result)

      expect(await oilfieldController.create({ name: 'test1' })).toBe(result)
    })
  })

  describe('linkWell', () => {
    it('создает скважину', async () => {
      const result: OilfieldWithWell = {
        field: { field_name: 'test1', id: '1', created_at: new Date(), updated_at: new Date() },
        well: { well_number: 'well123', id: '1', created_at: new Date(), updated_at: new Date(), field_id: '2' },
      }
      jest.spyOn(oilfieldService, 'linkWell').mockImplementation(async () => result)

      expect(await oilfieldController.linkWell({ oilfieldId: '1', wellName: 'well123' })).toBe(result)
    })
  })
})
