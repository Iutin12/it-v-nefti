import pytest
from vlp.src.schemas import CalculationRequestSchema
from vlp.src.services import VlpService


def test_vlp_calculate():
    vlp_schema = CalculationRequestSchema(
        start_pwf=0,
        end_pwf=0,
        step_pwf=0,
        well_head_pressure=10**5,
        depth=2000,
        fluid_compressibility=5 * (10**-9),
        fluid_density=800,
        pipe_diameter=0.146,
        inclination_angle=60,
        sections_number=10,
        moody_coefficient=0.5,
        start_liquid_rate=0,
        permeability=50,
        thickness=10,
        fluid_viscosity=1,
        fluid_voume_factor=1,
        saturation_pressure=80,
        average_reservoire_pressure=200,
        supply_contour_radius=500,
        well_radius=0.073,
        skin_factor=1,
        q_values=[449.520592924346,
        436.9340163224643,
        417.15511023379304,
        390.1838746583323,
        356.020309596082,
        314.66441504704216,
        266.11619101121283,
        210.37563748859392,
        147.4427544791854,
        77.31754198298742,
        0.0]

    )

    vlp_service = VlpService(model=vlp_schema)
    data = vlp_service.calculate()

    for i in data:
        print(i)


