import json
import math
from fastapi import FastAPI, HTTPException
import numpy as np
from pydantic import BaseModel, Field

app = FastAPI()


@app.get("/")
def read_root():
    return {"neft": "neft"}


class CalculationInput(BaseModel):
    StartPwf: float
    EndPwf: float
    StepPwf: float
    Permeability: float = Field(ge=1, le=100)
    Thickness: float = Field(ge=0.1, le=100)
    FluidViscosity: float = Field(ge=0.1, le=100)
    FluidVoumeFactor: float = Field(ge=1, le=2.1)
    SupplyContourRadius: float = Field(ge=100, le=1000)
    WellRadius: float = Field(ge=0.05, le=0.3)
    Skin: float = Field(ge=-3, le=10)
    AverageReservoirePressure: float = Field(ge=100, le=300)
    SaturationPressure: float = Field(ge=1, le=100)


"""
PI                          - Индекс продуктивности скважины
Permeability                - Проницаемость пласта (мД -> м^2)
Thickness                   - Толщина пласта  
FluidViscosity              - Вязкость флюида ( сП -> Па*с ) ???
FluidVoumeFactor            - Объемный коэффициент флюида
SupplyContourRadius         - радиус контура питания
WellRadius                  - радиус скважины
Skin                        - скин фактор скважины

Q                           - синтетическая кривая IPR c поправкой Вогеля
AverageReservoirePressure   - среднее пластовое давление (бар -> Па )
SaturationPressure          - давление насыщения (бар -> Па)
p_wf                        - забойное давление (бар -> Па -> атмос)
"""


@app.post("/irp/calculate")
def calculate(inputData: CalculationInput) -> object:
    StartPwf = inputData.StartPwf
    EndPwf = inputData.EndPwf
    StepPwf = inputData.StepPwf
    AverageReservoirePressure = inputData.AverageReservoirePressure
    Permeability = inputData.Permeability
    Thickness = inputData.Thickness
    FluidViscosity = inputData.FluidViscosity
    FluidVoumeFactor = inputData.FluidVoumeFactor
    SupplyContourRadius = inputData.SupplyContourRadius
    WellRadius = inputData.WellRadius
    Skin = inputData.Skin
    SaturationPressure = inputData.SaturationPressure

    p_wf = np.arange(StartPwf, EndPwf + StepPwf, StepPwf).tolist()
    Q = []
    SecInSut = 86400

    # Конвертируем в м^2

    Permeability = Permeability * (1.02 * 10 ** (-15))
    # перевод из бар в паскали

    # AverageReservoirePressure *= 10**5
    # SaturationPressure *= 10**5
    FluidViscosity /= 1000
    if EndPwf > AverageReservoirePressure:
        raise HTTPException(status_code=422, detail="Input should be less than or equal to AverageReservoirePressure ")
    try:
        PI = (2 * math.pi * Permeability * Thickness) / (
                FluidViscosity * FluidVoumeFactor * (math.log(SupplyContourRadius / WellRadius) - (1 / 2) + Skin))

        for i in range(len(p_wf)):
            Q.append((((PI * (AverageReservoirePressure - SaturationPressure) * 10 ** 5) / (
                    1 - 0.2 * (SaturationPressure / AverageReservoirePressure) - 0.8 * (
                    SaturationPressure / AverageReservoirePressure) ** 2)) * (
                              1 - 0.2 * ((p_wf[i]) / AverageReservoirePressure) - 0.8 * (
                              (p_wf[i]) / AverageReservoirePressure) ** 2)) * SecInSut)
    except:
        print("Ошибка")
    #перевод из баров -> Атмосферы
    p_wf = map(lambda x: x / 1.013, p_wf)
    return {
        'Q': Q,
        'p_wf': p_wf
    }
