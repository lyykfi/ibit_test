import { combineReducers } from 'redux';

import DealAddReducer from './deal/add';
import DealListReducer from './deal/list';

/**
 * combine reduces
 */
const rootReducer = combineReducers({
    DealAddReducer,
    DealListReducer,
});

export default rootReducer;
