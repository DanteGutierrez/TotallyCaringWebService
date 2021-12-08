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
import Logout from './components/Logout';

const url = "https://eatd-8s2kk.ondigitalocean.app/";

const SearchParamParse = (props) => {
    const [searchParams] = useSearchParams();
    return <Restaurant params={Object.fromEntries([...searchParams])} userid={props.userid} getReviews={props.getReviews}/>;
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            userid: "61aec30224bd9a3b59aef777",
            user: {},
            search: {},
            restaurantInformation: []
        };
        
        this.updateSearch = this.updateSearch.bind(this);
        this.getRestaurant = this.getRestaurant.bind(this);
        this.pullLocation = this.pullLocation.bind(this);
        this.getAccountInformation = this.getAccountInformation.bind(this);
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
        fetch(url + "api/users/" + this.state.userid)
            .then(res => res.json())
            .then(json => this.setState({ user: json }));
    }
    setRecentCookie = () => {
        Cookies.set('search', JSON.stringify(this.state.search), { path: '/' });
    }
    useRecentCookie = evt => {
        console.log("clicked!")
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
        this.getAccountInformation();
        this.pullLocation();
    }
    render() {
        return (
            <div id="App" className="container vertical maxWidth maxHeight">
                <NavigationBar onSubmit={evt => this.updateSearch(evt)} cookie={evt => this.useRecentCookie(evt)}/>
                <Routes>
                    <Route exact path="/" element={<HomePage restaurants={this.state.restaurantInformation}/>}/>
                    <Route path="/account" element={<AccountInformation userid={this.state.userid} user={this.state.user} updateAccount={() => this.getAccountInformation()} getReviews={params => this.getAdvancedReviews(params)}/>} />
                    <Route path="/restaurant" element={<SearchParamParse userid={this.state.userid} getReviews={params => this.getAdvancedReviews(params)}/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />}/>
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
