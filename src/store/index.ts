import rootReducer from 'reducers/index';
import { applyMiddleware, createStore, Store } from 'redux';
import ReduxThunk from 'redux-thunk';

/**
 * create new store
 * @function createNewStore
 */
export function createNewStore(): Store<any> {
    const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

    return store;
}
