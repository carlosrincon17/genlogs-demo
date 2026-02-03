import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Autocomplete from 'react-google-autocomplete';

interface SearchFormProps {
  fromCity: string;
  setFromCity: (city: string) => void;
  toCity: string;
  setToCity: (city: string) => void;
  onSearch: () => void;
}

export function SearchForm({
  fromCity,
  setFromCity,
  toCity,
  setToCity,
  onSearch,
}: SearchFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPlaceSelectedFrom = (place: any) => {
    setFromCity(place.formatted_address);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPlaceSelectedTo = (place: any) => {
    setToCity(place.formatted_address);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3 items-end">
          <div className="grid gap-2">
            <Label htmlFor="from">From (City)</Label>
            <Autocomplete
              onPlaceSelected={onPlaceSelectedFrom}
              options={{
                types: ['(cities)'],
              }}
              placeholder="Enter departure city"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={fromCity}
              onChange={(e) =>
                setFromCity((e.target as HTMLInputElement).value)
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="to">To (City)</Label>
            <Autocomplete
              onPlaceSelected={onPlaceSelectedTo}
              options={{
                types: ['(cities)'],
              }}
              placeholder="Enter destination city"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={toCity}
              onChange={(e) => setToCity((e.target as HTMLInputElement).value)}
            />
          </div>
          <Button onClick={onSearch}>Search</Button>
        </div>
      </CardContent>
    </Card>
  );
}
