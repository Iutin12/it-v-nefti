from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from vlp.src.schemas import CalculationResponseSchema, CalculationRequestSchema
from vlp.src.services import VlpService

router = APIRouter(prefix="/calculation", tags=["calculation"])


@router.post("")
async def run_calculate(response_data: CalculationRequestSchema):
    q = response_data.q_values
    response_data.q_values = [i/(10**5) for i in response_data.q_values]

    vlp_service = VlpService(response_data)
    x = vlp_service.calculate()
    y = CalculationResponseSchema(pwf=x, q=q)
    return y
