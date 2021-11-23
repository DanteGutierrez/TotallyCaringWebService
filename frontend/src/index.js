import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AccountInformation from './components/AccountInformation';


class App extends React.Component {
    render() {
        return (
            <div class="container vertical maxWidth maxHeight">
                <div id="NavigationBar" class="container horiztonal spaceEvenly maxWidth">
                    <Link to="/">Home</Link>
                    <Link to="/account">Account</Link>
                    <Link to="/more">More</Link>
                </div>
                
                <Routes>
                    <Route exact path="/" element={<h1>Home</h1>}/>
                    <Route path="/account" element={<AccountInformation />}/>
                    <Route path="/more" element={<h1>More</h1>}/>
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
