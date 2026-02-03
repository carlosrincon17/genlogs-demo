import { Routes } from '@/constants/apiRoutes';
import { Carrier } from '@/interfaces/Carrier';

const API_URL = import.meta.env.VITE_API_URL;

export class CarrierService {
    async searchCarriers(fromCity: string, toCity: string): Promise<Carrier[]> {
        try {
            const params = new URLSearchParams({
                from_city: fromCity,
                to_city: toCity,
            });
            const response = await fetch(`${API_URL}${Routes.Carriers}/search?${params.toString()}`);

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
