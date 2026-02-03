export interface Truck {
    plate: string;
    dot_number: string;
    status: string;
}

export interface Carrier {
    name: string;
    truck_count?: number;
    logo_url: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    related_trucks: Truck[];
}
