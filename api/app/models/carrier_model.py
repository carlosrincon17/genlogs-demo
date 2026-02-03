from pydantic import BaseModel, computed_field


class Truck(BaseModel):
    plate: str
    dot_number: str
    status: str

class Carrier(BaseModel):
    name: str
    logo_url: str
    contact_name: str
    contact_phone: str
    contact_email: str
    related_trucks: list[Truck] = []

    @computed_field
    @property
    def truck_count(self) -> int:
        return len(self.related_trucks)

class CarrierSearchRequest(BaseModel):
    from_city: str
    to_city: str
