from app.constants.carrier_constants import CARRIER_DATA
from app.managers.carrier_manager import CarrierManager
from app.models.carrier_model import Carrier

def test_get_carriers_east_coast():
    results = CarrierManager.get_carriers("New York", "Washington")
    assert len(results) == 3
    assert isinstance(results[0], Carrier)
    assert results[0].name == "Knight-Swift Transport Services"
    # Verify expected subset from flattened constants
    assert results[0].name == CARRIER_DATA[0]["name"]

def test_get_carriers_west_coast():
    results = CarrierManager.get_carriers("San Francisco", "Los Angeles")
    assert len(results) == 3
    assert results[0].name == "XPO Logistics"
    # Verify expected subset from flattened constants (Indices 3-5)
    assert results[0].name == CARRIER_DATA[3]["name"]

def test_get_carriers_default():
    results = CarrierManager.get_carriers("Chicago", "Miami")
    assert len(results) == 2
    assert results[0].name == "UPS Inc."
    # Verify expected subset from flattened constants (Indices 6+)
    assert results[0].name == CARRIER_DATA[6]["name"]

def test_get_carriers_case_insensitive():
    results = CarrierManager.get_carriers("new YORK", "WASHINGTON")
    assert len(results) == 3
    assert results[0].name == "Knight-Swift Transport Services"
