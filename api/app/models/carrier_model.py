from pydantic import BaseModel


class Carrier(BaseModel):
    name: str
    trucks: str

class CarrierSearchRequest(BaseModel):
    from_city: str
    to_city: str
