import math
from typing import Union

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


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
def calculate(k: float ,
              h: float,
              vn: float,
              B: float,
              r: float,
              rw: float,
              s: float,
              pAvg: float,
              pB:float,
              pWF: float):

    PI = (2 * math.pi * k * h)/ (vn * B * (math.log(r/rw) - (1/2) + s))

    Q = ((PI * (pAvg - pB))/(1 - 0.2 * (pB/pAvg) - 0.8 * (pWF/pAvg)**2)) * (1 - 0.2 * (pWF/pAvg) - 0.8 * (pWF/pAvg)**2)
    return {"Q":Q}
@app.get("/irp/test")
def test():
    return {"Q":2}
