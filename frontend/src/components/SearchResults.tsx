import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Carrier } from '@/interfaces/Carrier';

interface SearchResultsProps {
  results: Carrier[] | null;
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Results</CardTitle>
      </CardHeader>
      <CardContent>
        {results ? (
          <div className="grid gap-4">
            {results.map((carrier, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="font-medium">{carrier.name}</div>
                <div className="text-sm text-muted-foreground">
                  {carrier.trucks}
                </div>
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
