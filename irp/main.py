import json
import math
from fastapi import FastAPI

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

"""
@app.get("/irp/calculate")
def calculate(pWfStart: int,
              pWfEnd: int,
              pWfStep: int,
              Permeability : float,
              Thickness : float,
              FluidViscosity : float,
              FluidVoumeFactor : float,
              SupplyContourRadius : float,
              WellRadius : float,
              Skin : float,
              AverageReservoirePressure : float,
              SaturationPressure :float
              )->object:


    p_wf = [i for i in range(pWfStart,pWfEnd+pWfStep, pWfStep)]
    Q = []
    try:
        PI = (2 * math.pi * Permeability * Thickness)/(FluidViscosity * FluidVoumeFactor * (math.log(SupplyContourRadius/WellRadius) - (1/2) + Skin))
        for i in range(len(p_wf)):
            Q.append(((PI * (AverageReservoirePressure - SaturationPressure))/(1 - 0.2 * (SaturationPressure/AverageReservoirePressure) - 0.8 * (p_wf[i]/AverageReservoirePressure)**2)) * (1 - 0.2 * (p_wf[i]/AverageReservoirePressure) - 0.8 * (p_wf[i]/AverageReservoirePressure)**2))
    except:
        print("Ошибка")
    return {
        'Q': json.dumps(Q),
        'p_wf': json.dumps(p_wf)
    }
