import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import {useSearchParams, BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from './components/NavigationBar';
import HomePage from './components/HomePage';
import AccountInformation from './components/AccountInformation';
import Restaurant from './components/Restaurant';

const url = "https://eatd-8s2kk.ondigitalocean.app/yelp/businesses";

const SearchParamParse = () => {
    const [searchParams] = useSearchParams();
    return <Restaurant params={Object.fromEntries([...searchParams])}/>;
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            search: {},
            restaurantInformation: []
        };
        
        this.updateSearch = this.updateSearch.bind(this);
        this.getRestaurant = this.getRestaurant.bind(this);
        this.pullLocation = this.pullLocation.bind(this);
    }
    updateSearch = (evt) => {
        evt.preventDefault();
        let search = {};
        if (evt.target.location.value != '') {
            search = {
                term: evt.target.term.value,
                location: evt.target.location.value
            }
            this.setState({search: search}, () => {
                evt.target.reset();
                this.getRestaurant();
            })
        }
        else {
            search = this.pullLocation();
            evt.target.reset();
        }
        
    }
    getRestaurant = () => {
        fetch(url, { method: "POST", body: new URLSearchParams(this.state.search) })
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
        this.pullLocation();
    }
    render() {
        return (
            <div id="App" className="container vertical maxWidth maxHeight">
                <NavigationBar onSubmit={evt => this.updateSearch(evt)} />
                <Routes>
                    <Route exact path="/" element={<HomePage restaurants={this.state.restaurantInformation}/>}/>
                    <Route path="/account" element={<AccountInformation />} />
                    <Route path="/restaurant" element={<SearchParamParse/>} />
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
