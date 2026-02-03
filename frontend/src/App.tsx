import { useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
// import { SearchResults } from '@/components/SearchResults'; // Deprecated
import { CarrierList } from '@/components/CarrierList';
import { CarrierDetail } from '@/components/CarrierDetail';
import { MapDisplay } from '@/components/MapDisplay';
import { carrierService } from '@/services/carrierService';
import { Carrier } from '@/interfaces/Carrier';
import { useJsApiLoader, Libraries } from '@react-google-maps/api';

const libraries: Libraries = ['places', 'geometry'];

function App() {
    const [fromCity, setFromCity] = useState<string>('');
    const [toCity, setToCity] = useState<string>('');
    const [mapQuery, setMapQuery] = useState<{ from: string; to: string }>({ from: '', to: '' });

    const [searchResults, setSearchResults] = useState<Carrier[] | null>(null);
    const [selectedCarrier, setSelectedCarrier] = useState<Carrier | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    const handleSearch = async () => {
        setIsLoading(true);
        setSearchResults(null);
        setSelectedCarrier(null);
        setMapQuery({ from: '', to: '' }); // Clean routes

        try {
            const results = await carrierService.searchCarriers(fromCity, toCity);
            setSearchResults(results);
            setMapQuery({ from: fromCity, to: toCity }); // Render new route
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="flex flex-col h-screen bg-background font-sans antialiased overflow-hidden">
            <main className="flex-1 relative w-full h-full">
                <div className="absolute inset-0 z-0">
                    <MapDisplay from={mapQuery.from} to={mapQuery.to} />
                </div>

                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-4 pointer-events-none">
                    <div className="pointer-events-auto">
                        <SearchForm
                            fromCity={fromCity}
                            setFromCity={setFromCity}
                            toCity={toCity}
                            setToCity={setToCity}
                            onSearch={handleSearch}
                            isLoading={isLoading}
                        />
                    </div>
                </div>

                {(searchResults || isLoading) && (
                    <div className="absolute bottom-16 left-4 z-10 w-96 max-h-[calc(100vh-10rem)] pointer-events-none flex flex-col">
                        <div className="pointer-events-auto flex-1 overflow-y-auto pr-2 h-full">
                            {selectedCarrier ? (
                                <CarrierDetail
                                    carrier={selectedCarrier}
                                    onBack={() => setSelectedCarrier(null)}
                                />
                            ) : (
                                <CarrierList
                                    results={searchResults}
                                    isLoading={isLoading}
                                    onSelectCarrier={setSelectedCarrier}
                                />
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
