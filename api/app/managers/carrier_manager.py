from typing import List
from app.constants.carrier_constants import CARRIER_DATA
from app.models.carrier_model import Carrier

class CarrierManager:
    @staticmethod
    def get_carriers(from_city: str, to_city: str) -> List[Carrier]:
        from_city = from_city.lower()
        to_city = to_city.lower()
        
        if "new york" in from_city and "washington" in to_city:
            filtered_data = CARRIER_DATA[0:3]
        elif "san francisco" in from_city and "los angeles" in to_city:
            filtered_data = CARRIER_DATA[3:6]
        else:
            filtered_data = CARRIER_DATA[6:]
        return [Carrier(**carrier_data) for carrier_data in filtered_data]
