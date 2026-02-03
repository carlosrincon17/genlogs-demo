import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Carrier } from '@/interfaces/Carrier';
import { useState } from 'react';

interface SearchResultsProps {
  results: Carrier[] | null;
  isLoading?: boolean;
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  const [expandedCarrier, setExpandedCarrier] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedCarrier(expandedCarrier === index ? null : index);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Results</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : results ? (
          <div className="grid gap-4">
            {results.map((carrier, index) => (
              <div
                key={index}
                className="flex flex-col p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleExpand(index)}>
                  <div className="flex items-center gap-4">
                    <img src={carrier.logo_url} alt={`${carrier.name} logo`} className="h-10 w-10 object-contain rounded-md bg-white border" />
                    <div>
                      <div className="font-medium">{carrier.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {carrier.trucks}
                      </div>
                    </div>
                  </div>
                  <div>
                    {expandedCarrier === index ? '▲' : '▼'}
                  </div>
                </div>

                {expandedCarrier === index && (
                  <div className="mt-4 pt-4 border-t text-sm">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="font-semibold">Contact:</span> {carrier.contact_name}
                      </div>
                      <div>
                        <span className="font-semibold">Phone:</span> {carrier.contact_phone}
                      </div>
                      <div className="col-span-2">
                        <span className="font-semibold">Email:</span> {carrier.contact_email}
                      </div>
                    </div>

                    <div className="font-semibold mb-2">Related Trucks</div>
                    {carrier.related_trucks.length > 0 ? (
                      <div className="grid gap-2">
                        {carrier.related_trucks.map((truck, tIndex) => (
                          <div key={tIndex} className="flex justify-between items-center bg-background p-2 rounded border">
                            <div>Plate: <span className="font-mono">{truck.plate}</span></div>
                            <div>DOT: <span className="font-mono">{truck.dot_number}</span></div>
                            <div className={`px-2 py-0.5 rounded text-xs ${truck.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {truck.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted-foreground italic">No trucks linked to this route.</div>
                    )}
                  </div>
                )}
              </div>
            ))}
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
