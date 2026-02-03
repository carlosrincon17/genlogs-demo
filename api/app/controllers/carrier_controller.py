from app.constants.carrier_constants import CARRIER_DATA

class CarrierController:
    @staticmethod
    def search_carriers(from_city: str, to_city: str):
        from_city = from_city.lower()
        to_city = to_city.lower()

        if "new york" in from_city and "washington" in to_city:
            return CARRIER_DATA["us_east"]
        elif "san francisco" in from_city and "los angeles" in to_city:
            return CARRIER_DATA["west_coast"]
        else:
            return CARRIER_DATA["default"]
