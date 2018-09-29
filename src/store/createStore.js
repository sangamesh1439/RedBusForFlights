/*************************************************
 * Code Challange
 *************************************************/
import { createStore } from 'redux'
import reducers from './combineReducer';
const store = createStore(reducers);

store.subscribe(() => {
    //console.log("Store Changed : ", store.getState());
})
export default store