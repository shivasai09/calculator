import {createStore,combineReducers} from 'redux';
import formReducer from '../reducer/form';
import historyCounterReducer from '../reducer/histroycount';

const store =createStore(combineReducers({
    formReducer,
    historyCounterReducer
}));

export default store;
