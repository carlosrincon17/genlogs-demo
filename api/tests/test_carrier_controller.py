import pytest
from app.controllers.carrier_controller import CarrierController
from app.constants.carrier_constants import CARRIER_DATA

def test_search_carriers_east_coast():
    results = CarrierController.search_carriers("New York", "Washington")
    assert results == CARRIER_DATA["us_east"]
    assert len(results) == 3
    assert results[0]["name"] == "Knight-Swift Transport Services"

def test_search_carriers_west_coast():
    results = CarrierController.search_carriers("San Francisco", "Los Angeles")
    assert results == CARRIER_DATA["west_coast"]
    assert len(results) == 3
    assert results[0]["name"] == "XPO Logistics"

def test_search_carriers_default():
    results = CarrierController.search_carriers("Chicago", "Miami")
    assert results == CARRIER_DATA["default"]
    assert len(results) == 2
    assert results[0]["name"] == "UPS Inc."

def test_search_carriers_case_insensitive():
    results = CarrierController.search_carriers("new YORK", "WASHINGTON")
    assert results == CARRIER_DATA["us_east"]
