import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from './components/NavigationBar';
import HomePage from './components/HomePage';
import AccountInformation from './components/AccountInformation';

const url = "https://eatd-8s2kk.ondigitalocean.app/yelp/businesses";

class App extends React.Component {
    constructor() {
        super();
        // navigator.geolocation.getCurrentPosition(
        //     data => {
        //         console.log(data);
        //     },
        //     error => console.log(error), {
        //     enableHighAccuracy: true
        // }
        // );
        this.state = {
            search: {
                term: "Ice Cream",
                location: "Salt Lake City, UT"
            },
            restaurantInformation: []
        };
        this.updateSearch = this.updateSearch.bind(this);
        this.getRestaurant = this.getRestaurant.bind(this);
    }
    updateSearch = (evt) => {
        evt.preventDefault();
        this.setState({
            search: {
                term: evt.target.term.value,
                location: evt.target.location.value
            }
        }, () => {
            this.getRestaurant();
        })
    }
    getRestaurant = () => {
        fetch(url, { method: "POST", body: new URLSearchParams(this.state.search) })
            .then(res => res.json())
            .then(json => this.setState({ restaurantInformation: json }));
    }
    componentDidMount() {
        this.getRestaurant();
    }
    render() {
        return (
            <div id="App" className="container vertical maxWidth maxHeight">
                <NavigationBar onSubmit={evt => this.updateSearch(evt)} />
                <Routes>
                    <Route exact path="/" element={<HomePage restaurants={this.state.restaurantInformation}/>}/>
                    <Route path="/account" element={<AccountInformation />}/>
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
