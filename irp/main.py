import json
import math
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "222"}


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
def calculate(k: float,
              h: float,
              vn: float,
              B: float,
              r: float,
              rw: float,
              s: float,
              pAvg: float,
              pB:float
              )->object:

    P_WF = [0, 25, 49, 73, 97, 121, 145, 169, 193, 200]
    Q = []
    res = {}
    try:
        PI = (2 * math.pi * k * h)/(vn * B * (math.log(r/rw) - (1/2) + s))
        for i in range(len(P_WF)):
            Q.append(((PI * (pAvg - pB))/(1 - 0.2 * (pB/pAvg) - 0.8 * (P_WF[i]/pAvg)**2)) * (1 - 0.2 * (P_WF[i]/pAvg) - 0.8 * (P_WF[i]/pAvg)**2))
    except Exception:
        print("Ошибка")
    res = json.dumps(Q)
    print(res)

    return res
