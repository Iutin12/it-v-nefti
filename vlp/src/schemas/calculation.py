from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
from pydantic_core.core_schema import FieldValidationInfo


class CalculationResponseSchema(BaseModel):
    pwf: List[float]
    q: List[float]

    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "examples": [
                {
                    "x": [1, 2, 3, 4, 5],
                    "y": [6, 7, 8, 9, 10],
                }
            ]
        }
    }


class CalculationRequestSchema(BaseModel):
    start_pwf: float = Field(alias='StartPwf')
    end_pwf: float = Field(alias='EndPwf')
    step_pwf: float = Field(alias='StepPwf')
    well_head_pressure: float = Field(alias='WellHeadPressure')
    depth: float = Field(ge=1000, le=3000, alias='Depth')
    fluid_compressibility: float = Field(ge=4*(10**(-9)), le=6*(10**(-9)), alias='FluidCompressibility')
    fluid_density: float = Field(ge=700, le=1000, alias='FluidDensity')
    pipe_diameter: float = Field(ge=0.09, le=0.2, alias='PipeDiameter')
    inclination_angle: float = Field(ge=0, le=90, alias='InclinationAngle')
    sections_number: int = Field(ge=1, le=1000, alias='SectionsNumber')
    moody_coefficient: float = Field(ge=0.1, le=0.9, alias='MoodyCoefficient')
    start_liquid_rate: float = Field(ge=0, le=100, alias='StartLiquidRate')
    permeability: float = Field(ge=1, le=100, alias='Permeability')
    thickness: float = Field(ge=0.1, le=100, alias='Thickness')
    fluid_viscosity: float = Field(ge=0.1, le=100, alias='FluidViscosity')
    fluid_voume_factor: float = Field(ge=1, le=2.1, alias='FluidVoumeFactor')
    saturation_pressure: float = Field(ge=1, le=100, alias='SaturationPressure')
    average_reservoire_pressure: float = Field(ge=100, le=300, alias='AverageReservoirePressure')
    supply_contour_radius: float = Field(ge=100, le=1000, alias='SupplyContourRadius')
    well_radius: float = Field(ge=0.05, le=0.3, alias='WellRadius')
    skin_factor: float = Field(ge=-3, le=10, alias='SkinFactor')
    q_values: List[float] = Field(alias='Q')

    class Config:
        populate_by_name = True

    # @field_validator("end_pwf")
    # @classmethod
    # def pwf_start_range(cls, v, info: FieldValidationInfo, **kwargs):
    #     if v is not None and info.data["salary_from"] is not None:
    #         if v < info.data["salary_from"]:
    #             raise ValueError("Неверный диапазон зарплаты!")
    #     return v
