export interface Carrier {
    name: string;
    trucks: string;
}

export class CarrierService {
    async searchCarriers(fromCity: string, toCity: string): Promise<Carrier[]> {
        try {
            const params = new URLSearchParams({
                from_city: fromCity,
                to_city: toCity,
            });
            const response = await fetch(`http://localhost:8000/api/v1/carriers/search?${params.toString()}`);

            if (!response.ok) {
                console.error('Failed to fetch carriers:', response.statusText);
                return [];
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching carriers:', error);
            return [];
        }
    }
}

export const carrierService = new CarrierService();
