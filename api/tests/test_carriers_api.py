from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

SEARCH_URL = "/api/v1/carriers/find"

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "GenLogs API is running"}

def test_search_carriers_api_east_coast():
    params = {"from_city": "New York", "to_city": "Washington"}
    response = client.get(SEARCH_URL, params=params)
    assert response.status_code == 200
    
    data = response.json()
    assert len(data) == 3
    assert data[0]["name"] == "Knight-Swift Transport Services"

def test_search_carriers_api_west_coast():
    params = {"from_city": "San Francisco", "to_city": "Los Angeles"}
    response = client.get(SEARCH_URL, params=params)
    assert response.status_code == 200
    
    data = response.json()
    assert len(data) == 3
    assert data[0]["name"] == "XPO Logistics"

def test_search_carriers_api_default():
    params = {"from_city": "Unknown", "to_city": "City"}
    response = client.get(SEARCH_URL, params=params)
    assert response.status_code == 200
    
    data = response.json()
    assert len(data) == 2
    assert data[0]["name"] == "UPS Inc."

def test_search_carriers_validation_error():
    # Missing fields
    params = {"from_city": "New York"}
    response = client.get(SEARCH_URL, params=params)
    assert response.status_code == 422
