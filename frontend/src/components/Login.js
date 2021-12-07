import React from 'react';
import { createStore } from 'react-redux';
import './Login.css';

const url = "https://eatd-8s2kk.ondigitalocean.app/";

class Login extends React.Component {
    LoginCheck = async (evt) => {
        evt.preventDefault();
        let greenlight = await fetch(url + "api/checklogin", { method: "POST", body: new URLSearchParams({ email: evt.target.email.value, password: evt.target.password.value }) })
            .then(res => res.json());
        if (greenlight) {
            //create Session
            jwt.sign()
        }
        evt.target.reset();
    }
    render() {
        return (
            <div id="Login">
                <form className="container vertical wireframe item" onSubmit={evt => this.LoginCheck(evt)}>
                    <label className="item" htmlFor="email">Email: </label>
                    <input className="item" type="text" name="email" placeholder="email" />
                    <label className="item" htmlFor="password">Password: </label>
                    <input className="item" type="text" name="password" placeholder="password" />
                    <input className="item" type="submit" value="Login"/>
                </form>
            </div>
        )
    }
}

export default Login;