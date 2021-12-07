import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import LoginReducer from './reducers/LoginReducer';

const ConfigureStore = () => {
    var initialState = {};
    try {
        initialState = sessionStorage.getItem("master_class") ? JSON.parse(sessionStorage.getItem("master_class")) : {};
    } catch (error) {
        console.log('getError', error)
    }
    const saver = (store) => next => action => {
        let stateToSave = store.getState();
        sessionStorage.setItem("master_class", JSON.stringify({...stateToSave}))
        return next(action);
    }
    const rootReducer = combineReducers({
        login: LoginReducer,
    });
    return createStore(rootReducer, initialState, applyMiddleware(thunk, saver));
}
export default ConfigureStore;