import { Truck } from '@/interfaces/Carrier';

interface TruckListProps {
    trucks: Truck[];
}

export function TruckList({ trucks }: TruckListProps) {
    if (!trucks || trucks.length === 0) {
        return <div className="text-muted-foreground italic text-sm">No trucks linked to this route.</div>;
    }

    return (
        <div className="grid gap-2">
            {trucks.map((truck, index) => (
                <div key={index} className="flex justify-between items-center bg-background p-2 rounded border text-sm">
                    <div>
                        <span className="text-muted-foreground text-xs">Plate:</span> <span className="font-mono font-medium">{truck.plate}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground text-xs">DOT:</span> <span className="font-mono font-medium">{truck.dot_number}</span>
                    </div>
                    <div className={`px-2 py-0.5 rounded text-xs ${truck.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {truck.status}
                    </div>
                </div>
            ))}
        </div>
    );
}
