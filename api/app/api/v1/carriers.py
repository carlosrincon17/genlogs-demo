from typing import List

from fastapi import APIRouter, Depends

from app.controllers.carrier_controller import CarrierController
from app.models.carrier_model import Carrier, CarrierSearchRequest

router = APIRouter()

@router.get("/find", response_model=List[Carrier])
def search_carriers(request: CarrierSearchRequest = Depends()):
    return CarrierController.search_carriers(request.from_city, request.to_city)
