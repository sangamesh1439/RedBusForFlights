
import flightsData from '../../__mocks__/flightsData';
let initState = {
    flights: flightsData,
    filteredFilghts: flightsData,
    searchParams: {}
}

const flightsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEARCH':
            let searchParams = action.payload.searchParams;
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
        if (!(flight.source === source)) { return false };
        if (!(flight.destination === destination)) { return false };
        if (!(price <= parseInt(flight.price, 10))) { return false };
        return true;
    });
    console.log('filteredFilghts: ', filteredFilghts);
    return filteredFilghts;
}

const twoWaySearch = (searchParams) => {
    const oneWay = oneWaySearch(searchParams);
    let returnSearchParams = { ...searchParams, source: searchParams.destination, destination: searchParams.source };
    const twoWay = oneWaySearch(returnSearchParams);

    console.log('oneWay: ', oneWay);
    console.log('twoWay: ', twoWay);

    const allPossibleRoutes = [];
    oneWay.map((flightA) => {
        return twoWay.map((flightB) => {
            const roundTripPrice = flightA.price + flightB.price;
            console.log('roundTripPrice', roundTripPrice);
            console.log('searchParams price', searchParams.price);
            if (searchParams.price === 0) {
                allPossibleRoutes.push([flightA, flightB])

            }
            else if (roundTripPrice < searchParams.price) {
                allPossibleRoutes.push([flightA, flightB])
            }
            return true
        })
    })
    console.log('allPossibleRoutes: ', allPossibleRoutes);
    return allPossibleRoutes;
}

export default flightsReducer;