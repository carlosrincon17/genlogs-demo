import { Carrier } from '@/interfaces/Carrier';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CarrierListProps {
    results: Carrier[] | null;
    isLoading: boolean;
    onSelectCarrier: (carrier: Carrier) => void;
}

export function CarrierList({ results, isLoading, onSelectCarrier }: CarrierListProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>Search Results</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex justify-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : results ? (
                    <div className="grid gap-4">
                        {results.length === 0 ? (
                            <p className="text-muted-foreground text-center p-4">
                                No carriers found.
                            </p>
                        ) : (
                            results.map((carrier, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                    onClick={() => onSelectCarrier(carrier)}
                                >
                                    <img
                                        src={carrier.logo_url}
                                        alt={`${carrier.name} logo`}
                                        className="h-12 w-12 object-contain rounded-md bg-white border"
                                    />
                                    <div>
                                        <div className="font-medium">{carrier.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {carrier.trucks}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center">
                        No results found. Perform a search to see options.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
