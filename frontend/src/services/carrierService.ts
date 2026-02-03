export interface Carrier {
  name: string;
  trucks: string;
}

export class CarrierService {
  searchCarriers(fromCity: string, toCity: string): Carrier[] {
    const from = fromCity.toLowerCase();
    const to = toCity.toLowerCase();

    if (from.includes('new york') && to.includes('washington')) {
      return [
        { name: 'Knight-Swift Transport Services', trucks: '10 Trucks/Day' },
        { name: 'J.B. Hunt Transport Services Inc', trucks: '7 Trucks/Day' },
        { name: 'YRC Worldwide', trucks: '5 Trucks A day' },
      ];
    } else if (from.includes('san francisco') && to.includes('los angeles')) {
      return [
        { name: 'XPO Logistics', trucks: '9 Trucks/Day' },
        { name: 'Schneider', trucks: '6 Trucks/Day' },
        { name: 'Landstar Systems', trucks: '2 Trucks A day' },
      ];
    } else {
      return [
        { name: 'UPS Inc.', trucks: '11 trucks Day' },
        { name: 'FedEx Corp', trucks: '9 trucks a day' },
      ];
    }
  }
}

export const carrierService = new CarrierService();
