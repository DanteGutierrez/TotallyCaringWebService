import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import { createStore } from 'redux';
import { sessionService } from 'redux-react-session';

const reducers = {
    //Add other reducers here 

    session: sessionReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer)

const options = {refreshOnCheckAuth: true, redirectPath: '//-- path--//', driver: 'COOKIES'};


sessionService.initSessionService(store, options);

const { bool } = PropTypes;
Routes.propTypes = {
    sessionInfo: bool.isRequired,
    checked: bool.isRequired
};

const mapStateToProps = state => {
    return {sessionInfo: state.session.authenticated, checked: state.session.checked,}
};

export default connect(mapStateToProps) (Routes);
