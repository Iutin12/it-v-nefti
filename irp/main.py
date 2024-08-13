import json
import math
from fastapi import FastAPI, Query, HTTPException
import numpy as np
app = FastAPI()


@app.get("/")
def read_root():
    return {"neft": "neft"}


"""
PI                          - Индекс продуктивности скважины
Permeability                - Проницаемость пласта
Thickness                   - Толщина пласта
FluidViscosity              - Вязкость флюида
FluidVoumeFactor            - Коэффициент объемного расширения ?? (Объемный коэффициент флюида)
SupplyContourRadius         - радиус контура питания
WellRadius                  - радиус скважины
Skin                        - скин фактор скважины

Q                           - синтетическая кривая IPR c поправкой Вогеля
AverageReservoirePressure   - среднее пластовое давление
SaturationPressure          - давление насыщения 
p_wf                        - забойное давление
"""

@app.get("/irp/calculate")
def calculate(StartPwf: float,
              EndPwf: float,
              StepPwf: float,
              Permeability: float = Query(ge=1, le=100),
              Thickness: float = Query(ge=0.1, le=100),
              FluidViscosity: float = Query(ge=0.1, le=100),
              FluidVoumeFactor: float = Query(ge=1, le=2.1),
              SupplyContourRadius: float = Query(ge=100, le=1000),
              WellRadius: float = Query(ge=0.05, le=0.3),
              Skin: float = Query(ge=-3, le=10),
              AverageReservoirePressure: float = Query(ge=100, le=300),
              SaturationPressure: float = Query(ge=1, le=100)
              ) -> object:
    p_wf = np.arange(StartPwf, EndPwf + StepPwf, StepPwf).tolist()
    Q = []
    if EndPwf > AverageReservoirePressure:
        raise HTTPException(status_code=422, detail="Input should be less than or equal to AverageReservoirePressure ")
    try:
        PI = (2 * math.pi * Permeability * Thickness) / (
                FluidViscosity * FluidVoumeFactor * (math.log(SupplyContourRadius / WellRadius) - (1 / 2) + Skin))
        for i in range(len(p_wf)):
            Q.append(((PI * (AverageReservoirePressure - SaturationPressure)) / (
                    1 - 0.2 * (SaturationPressure / AverageReservoirePressure) - 0.8 * (
                    p_wf[i] / AverageReservoirePressure) ** 2)) * (
                             1 - 0.2 * (p_wf[i] / AverageReservoirePressure) - 0.8 * (
                             p_wf[i] / AverageReservoirePressure) ** 2))
    except:
        print("Ошибка")
    return {
        'Q': json.dumps(Q),
        'p_wf': json.dumps(p_wf)
    }