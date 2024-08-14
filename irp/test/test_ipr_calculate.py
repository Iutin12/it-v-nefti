import pytest
from fastapi.testclient import TestClient
from irp.main import app  # Replace with the actual name of your FastAPI app file

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
    # data = response.json()
    # assert "Q" in data
    # assert "p_wf" in data
    # assert len(data["Q"]) == 11  # Number of points based on StartPwf, EndPwf, StepPwf
    # assert len(data["p_wf"]) == 11

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
