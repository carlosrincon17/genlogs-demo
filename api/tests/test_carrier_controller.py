from app.controllers.carrier_controller import CarrierController
from app.models.carrier_model import Carrier


def test_search_carriers_east_coast():
    results = CarrierController.search_carriers("New York", "Washington")
    # Controller now returns list of Carrier models
    assert len(results) == 3
    assert isinstance(results[0], Carrier)
    assert results[0].name == "Knight-Swift Transport Services"

def test_search_carriers_west_coast():
    results = CarrierController.search_carriers("San Francisco", "Los Angeles")
    assert len(results) == 3
    assert results[0].name == "XPO Logistics"

def test_search_carriers_default():
    results = CarrierController.search_carriers("Chicago", "Miami")
    assert len(results) == 2
    assert results[0].name == "UPS Inc."

def test_search_carriers_case_insensitive():
    results = CarrierController.search_carriers("new YORK", "WASHINGTON")
    assert len(results) == 3
    assert results[0].name == "Knight-Swift Transport Services"
