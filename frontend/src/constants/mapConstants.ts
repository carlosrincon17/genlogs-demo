export const MAP_CONSTANTS = {
  MAP_ID: 'd3065da415419714e1223c61',
  DEFAULT_CENTER: {
    lat: 39.8283,
    lng: -98.5795,
  },
  ROUTES_API_URL: 'https://routes.googleapis.com/directions/v2:computeRoutes',
  FIELD_MASK: 'routes.polyline.encodedPolyline',
  TRAVEL_MODE: 'DRIVE',
  ROUTE_COLORS: {
    SELECTED: '#1034A6',
    UNSELECTED: '#7393B3',
  },
};

export const getPolylineOptions = (isSelected: boolean) => ({
  strokeColor: isSelected
    ? MAP_CONSTANTS.ROUTE_COLORS.SELECTED
    : MAP_CONSTANTS.ROUTE_COLORS.UNSELECTED,
  strokeOpacity: 0.8,
  strokeWeight: 5,
  zIndex: isSelected ? 10 : 1,
  clickable: true,
});
