from fastapi import APIRouter
from app.controllers.carrier_controller import CarrierController
from app.models.carrier_model import Carrier, CarrierSearchRequest
from typing import List

router = APIRouter()

@router.post("/search", response_model=List[Carrier])
def search_carriers(request: CarrierSearchRequest):
    return CarrierController.search_carriers(request.from_city, request.to_city)
