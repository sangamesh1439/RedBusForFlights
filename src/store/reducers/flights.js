
import flightsData from '../../__mocks__/flightsData';
let initState = {
    flights: flightsData
}

const flightsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FILTER_DATA':
            return state;
        default:
            return state;
    }
};
export default flightsReducer;