import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Carrier } from '@/interfaces/Carrier';

interface SearchResultsProps {
  results: Carrier[] | null;
  isLoading?: boolean;
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
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
