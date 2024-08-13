import json
import math
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"neft": "neft"}


"""
PI      - Индекс продуктивности скважины
k       - Проницаемость пласта
h       - Толщина пласта
vn      - Вязкость нефти
B       - Коэффициент объемного расширения ?? (Объемный коэффициент флюида)
r       - радиус ??
rw      - радиус скважины
s       - скин фактор скважины

Q       - синтетическая кривая IPR c поправкой Вогеля
pAvg    - среднее пластовое давление
pB      - давление насыщения 

"""
@app.get("/irp/calculate")
def calculate(pWfStart:int,
              pWfEnd: int,
              pWfStep: int,
              k: float,
              h: float,
              vn: float,
              B: float,
              r: float,
              rw: float,
              s: float,
              pAvg: float,
              pB:float
              )->object:


    p_wf = [i for i in range(pWfStart,pWfEnd+pWfStep, pWfStep)]
    Q = []
    try:
        PI = (2 * math.pi * k * h)/(vn * B * (math.log(r/rw) - (1/2) + s))
        for i in range(len(p_wf)):
            Q.append(((PI * (pAvg - pB))/(1 - 0.2 * (pB/pAvg) - 0.8 * (p_wf[i]/pAvg)**2)) * (1 - 0.2 * (p_wf[i]/pAvg) - 0.8 * (p_wf[i]/pAvg)**2))
    except Exception:
        print("Ошибка")
    return {
        'Q': json.dumps(Q),
        'p_wf': json.dumps(p_wf)
    }
