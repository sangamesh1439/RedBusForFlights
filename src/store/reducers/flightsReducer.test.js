
/*************************************************
 * Code Challange
 *************************************************/
import flightsReducer from './flightsReducer';
import {expect} from 'chai';
import flightsData from '../../__mocks__/flightsData';

import actions from '../../containers/SearchBar/actions'

describe('post reducer', () => {
    it('should return the initial state', () => {
        expect(flightsReducer(undefined, {}).flights).equal(flightsData);
    });
});
