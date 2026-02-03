import { useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { SearchResults } from '@/components/SearchResults';
import { MapDisplay } from '@/components/MapDisplay';
import { carrierService } from '@/services/carrierService';
import { Carrier } from '@/interfaces/Carrier';
import { useJsApiLoader, Libraries } from '@react-google-maps/api';

const libraries: Libraries = ['places', 'geometry'];

function App() {
    const [fromCity, setFromCity] = useState<string>('');
    const [toCity, setToCity] = useState<string>('');

    const [searchResults, setSearchResults] = useState<Carrier[] | null>(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    const handleSearch = async () => {
        const results = await carrierService.searchCarriers(fromCity, toCity);
        setSearchResults(results);
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="flex flex-col h-screen bg-background font-sans antialiased overflow-hidden">
            <main className="flex-1 relative w-full h-full">
                <div className="absolute inset-0 z-0">
                    <MapDisplay from={fromCity} to={toCity} />
                </div>

                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-4 pointer-events-none">
                    <div className="pointer-events-auto">
                        <SearchForm
                            fromCity={fromCity}
                            setFromCity={setFromCity}
                            toCity={toCity}
                            setToCity={setToCity}
                            onSearch={handleSearch}
                        />
                    </div>
                </div>

                {searchResults && (
                    <div className="absolute bottom-16 left-4 z-10 w-96 max-h-[calc(100vh-10rem)] pointer-events-none flex flex-col">
                        <div className="pointer-events-auto flex-1 overflow-y-auto pr-2">
                            <SearchResults results={searchResults} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
