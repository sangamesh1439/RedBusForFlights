
/*************************************************
 * Code Challange
 *************************************************/
import flightsData from '../../__mocks__/flightsData';
const initState = {
    flights: flightsData,
    filteredFilghts: flightsData,
    searchParams: {}
}

const flightsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEARCH':
            const searchParams = action.payload.searchParams;
            if (searchParams.way === 1) {
                return { ...state, searchParams: searchParams, filteredFilghts: oneWaySearch(searchParams) };
            }
            else if (searchParams.way === 2) {
                return { ...state, searchParams: searchParams, filteredFilghts: twoWaySearch(searchParams) };
            }
            else
                return state;
        case 'CLEAR':
            return { ...state, filteredFilghts: flightsData };
        default:
            return state;
    }
};

const oneWaySearch = (searchParams) => {
    const source = searchParams.source.toLowerCase();
    const destination = searchParams.destination.toLowerCase();
    const price = parseInt(searchParams.price, 10);
    const departureDay = new Date(searchParams.departureDate).getDay();
    const filteredFilghts = flightsData.filter((flight) => {
        if (!flight.worksOnThesedays[departureDay]) {
            return false;
        }
        if (!(flight.source === source)) { return false }
        if (!(flight.destination === destination)) { return false }
        if (searchParams.way === 1) {
            if (!(price <= parseInt(flight.price, 10))) { return false }
        }
        return true;
    });
    return filteredFilghts;
}

const twoWaySearch = (searchParams) => {
    const oneWay = oneWaySearch(searchParams);
    const returnSearchParams = { ...searchParams, source: searchParams.destination, destination: searchParams.source };
    const twoWay = oneWaySearch(returnSearchParams);
    const allPossibleRoutes = [];
    oneWay.map((flightA) => {
        return twoWay.map((flightB) => {
            const roundTripPrice = flightA.price + flightB.price;
            if (searchParams.price === 0) {
                allPossibleRoutes.push([flightA, flightB])

            }
            else if (roundTripPrice <= searchParams.price) {
                allPossibleRoutes.push([flightA, flightB])
            }
            return true
        })
    })
    return allPossibleRoutes;
}

export default flightsReducer;