import { ApiProperty } from '@nestjs/swagger'
import { field, well } from '@prisma/client'

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
  field: field
  @ApiProperty()
  well: well
}

export class OilfieldDto implements field {
  @ApiProperty()
  id: string
  @ApiProperty()
  created_at: Date
  @ApiProperty()
  field_name: string
  @ApiProperty()
  updated_at: Date
}

export class WellDto implements well {
  @ApiProperty()
  id: string
  @ApiProperty()
  well_number: string
  @ApiProperty()
  field_id: string
  @ApiProperty()
  updated_at: Date
  @ApiProperty()
  created_at: Date
}
