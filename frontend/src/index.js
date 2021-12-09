import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { useSearchParams, BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cookies from 'js-cookie';

import NavigationBar from './components/NavigationBar';
import HomePage from './components/HomePage';
import AccountInformation from './components/AccountInformation';
import Restaurant from './components/Restaurant';
import Login from './components/Login';

const url = "https://eatd-8s2kk.ondigitalocean.app/";

const SearchParamParse = (props) => {
    const [searchParams] = useSearchParams();
    if (props.userid !== undefined) {
        return <Restaurant params={Object.fromEntries([...searchParams])} userid={props.userid} getReviews={props.getReviews} />;
    }
    else {
        return <Login />
    }
}
const AccountFunction = (props) => {
    if (props.userid !== undefined) {
        return <AccountInformation userid={props.userid} user={props.user} updateAccount={props.updateAccount} getReviews={props.getReviews}/>
    }
    else {
        return <Login />
    }
}
const LogoutFunction = () => {
    Cookies.remove('session');
    return <Login />
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {},
            search: {},
            restaurantInformation: [],
            isLoggedIn: Cookies.get('session') !== undefined
        };
        this.updateSearch = this.updateSearch.bind(this);
        this.getRestaurant = this.getRestaurant.bind(this);
        this.pullLocation = this.pullLocation.bind(this);
        this.getAccountInformation = this.getAccountInformation.bind(this);
        this.loginCheck = this.loginCheck.bind(this);
    }
    loginCheck = async (evt) => {
        evt.preventDefault();
        let greenlight = await fetch(url + "api/checklogin", { method: "POST", body: new URLSearchParams({ email: evt.target.email.value, password: evt.target.password.value }) })
            .then(res => res.json());
        if (greenlight !== false && greenlight !== '/') {
            Cookies.set('session', greenlight);
            this.setState({ isLoggedIn: true });
            this.getAccountInformation();
        }
        evt.target.reset();
    }
    getAdvancedReviews = async (params) => {
        let json = await fetch(url + "api/reviews/search?" + params)
            .then(res => res.json())
        let promise = json.map(async (entry) => {
            return fetch(url + "api/users/" + entry.userid)
                .then(res => res.json())
                .then(userJSON => {
                    entry.username = userJSON.name
                })
        })
        return Promise.all(promise).then(() => {
            return json
        });
    }
    getAccountInformation = () => {
        fetch(url + "api/users/" + Cookies.get('session'))
            .then(res => res.json())
            .then(json => this.setState({ user: json }));
    }
    setRecentCookie = () => {
        Cookies.set('search', JSON.stringify(this.state.search), {expires: 7});
    }
    useRecentCookie = evt => {
        this.setState({ search: JSON.parse(Cookies.get('search')) }, () => this.getRestaurant());
    }
    updateSearch = (evt) => {
        evt.preventDefault();
        let search = {};
        if (evt.target.location.value !== '') {
            search = {
                term: evt.target.term.value,
                location: evt.target.location.value
            }
            this.setState({search: search}, () => {
                evt.target.reset();
                this.setRecentCookie();
                this.getRestaurant();
            })
        }
        else {
            search = this.pullLocation();
            evt.target.reset();
        }
    }
    getRestaurant = () => {
        fetch(url + "yelp/businesses", { method: "POST", body: new URLSearchParams(this.state.search) })
            .then(res => res.json())
            .then(json => this.setState({ restaurantInformation: json }));
    }
    pullLocation = () => {
        let search = {
            term: "",
            location: "Bakersfield, CA"
        }
        navigator.geolocation.getCurrentPosition(
            data => {
                search = {
                    longitude: data.coords.longitude,
                    latitude: data.coords.latitude
                }
                this.setState({search: search}, () => this.getRestaurant())
            },
            error => {
                console.log(error)
                this.setState({search: search}, () => this.getRestaurant())
            }, { enableHighAccuracy: true }
        );
    }
    componentDidMount() {
        if (Cookies.get('session') !== undefined) {
            this.getAccountInformation();
        }
        this.pullLocation();
    }
    render() {
        return (
            <div id="App" className="container vertical maxWidth maxHeight">
                <NavigationBar isLoggedIn={Cookies.get('session') !== undefined} onSubmit={evt => this.updateSearch(evt)} cookie={evt => this.useRecentCookie(evt)}/>
                <Routes>
                    <Route exact path="/" element={<HomePage restaurants={this.state.restaurantInformation}/>}/>
                    <Route path="/account" element={<AccountFunction userid={Cookies.get('session')} user={this.state.user} updateAccount={() => this.getAccountInformation()} getReviews={params => this.getAdvancedReviews(params)}/>} />
                    <Route path="/restaurant" element={<SearchParamParse userid={Cookies.get('session')} getReviews={params => this.getAdvancedReviews(params)}/>} />
                    <Route path="/login" element={<Login loginCheck={evt => this.loginCheck(evt)}/>} />
                    <Route path="/logout" element={<LogoutFunction />}/>
                </Routes>
            </div>
        )
    }
}


ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
