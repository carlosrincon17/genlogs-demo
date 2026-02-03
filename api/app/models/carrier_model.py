from pydantic import BaseModel


class Truck(BaseModel):
    plate: str
    dot_number: str
    status: str

class Carrier(BaseModel):
    name: str
    trucks: str  # Kept for backward compatibility display if needed, or update to description
    logo_url: str
    contact_name: str
    contact_phone: str
    contact_email: str
    related_trucks: list[Truck] = []

class CarrierSearchRequest(BaseModel):
    from_city: str
    to_city: str
