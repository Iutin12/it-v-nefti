from fastapi.testclient import TestClient
from irp.main import app

client = TestClient(app)


def test_calculate_success():
    response = client.post("/irp/calculate", json={
        "StartPwf": 0,
        "EndPwf": 250,
        "StepPwf": 1,
        "Permeability": 50,
        "Thickness": 10,
        "FluidViscosity": 1,
        "FluidVoumeFactor": 1,
        "SupplyContourRadius": 500,
        "WellRadius": 0.073,
        "SkinFactor": 1,
        "AverageReservoirePressure": 200,
        "SaturationPressure": 80
    })

    assert response.status_code == 200


def test_calculate_success_long_range():
    response = client.post("/irp/calculate", json={
        "StartPwf": 0,
        "EndPwf": 3000,
        "StepPwf": 0.01,
        "Permeability": 50,
        "Thickness": 10,
        "FluidViscosity": 1,
        "FluidVoumeFactor": 1,
        "SupplyContourRadius": 500,
        "WellRadius": 0.073,
        "SkinFactor": 1,
        "AverageReservoirePressure": 200,
        "SaturationPressure": 80
    })

    assert response.status_code == 200


def test_calculate_invalid_permeability():
    response = client.post("/irp/calculate", json={
        "StartPwf": 0,
        "EndPwf": 250,
        "StepPwf": 1,
        "Permeability": 250,
        "Thickness": 10,
        "FluidViscosity": 1,
        "FluidVoumeFactor": 1,
        "SupplyContourRadius": 500,
        "WellRadius": 0.073,
        "SkinFactor": 1,
        "AverageReservoirePressure": 200,
        "SaturationPressure": 80
    })

    assert response.status_code == 422


def test_calculate_invalid_thickness():
    response = client.post("/irp/calculate", json={
        "StartPwf": 0,
        "EndPwf": 250,
        "StepPwf": 1,
        "Permeability": 50,
        "Thickness": 0.01,
        "FluidViscosity": 1,
        "FluidVoumeFactor": 1,
        "SupplyContourRadius": 500,
        "WellRadius": 0.073,
        "SkinFactor": 1,
        "AverageReservoirePressure": 200,
        "SaturationPressure": 80
    })

    assert response.status_code == 422


