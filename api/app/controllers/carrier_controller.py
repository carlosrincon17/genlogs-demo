from app.managers.carrier_manager import CarrierManager


class CarrierController:
    @staticmethod
    def search_carriers(from_city: str, to_city: str):
        from_city = from_city.lower()
        to_city = to_city.lower()
        return CarrierManager.get_carriers(from_city, to_city)
