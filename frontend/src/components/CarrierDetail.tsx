import { Carrier } from '@/interfaces/Carrier';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TruckList } from './TruckList';
import { ArrowLeft } from 'lucide-react'; // Assuming lucide-react is available or use text

interface CarrierDetailProps {
    carrier: Carrier;
    onBack: () => void;
}

export function CarrierDetail({ carrier, onBack }: CarrierDetailProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
                    <span className="sr-only">Back</span>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-lg">{carrier.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
                <div className="flex justify-center mb-6">
                    <img
                        src={carrier.logo_url}
                        alt={`${carrier.name} logo`}
                        className="h-24 w-auto object-contain p-2 bg-white rounded-lg border"
                        onError={(e) => {
                            const img = e.currentTarget;
                            img.onerror = null;
                            img.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(carrier.name)}`;
                        }}
                    />
                </div>

                <div className="grid gap-4 mb-6 text-sm">
                    <div className="font-semibold text-base border-b pb-1">Contact Information</div>
                    <div className="grid grid-cols-1 gap-2">
                        <div>
                            <span className="font-medium text-muted-foreground">Contact:</span> {carrier.contact_name}
                        </div>
                        <div>
                            <span className="font-medium text-muted-foreground">Phone:</span> {carrier.contact_phone}
                        </div>
                        <div>
                            <span className="font-medium text-muted-foreground">Email:</span> {carrier.contact_email}
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="font-semibold text-base border-b pb-1">Related Trucks</div>
                    <TruckList trucks={carrier.related_trucks} />
                </div>
            </CardContent>
        </Card>
    );
}
