import React from 'react';
import './Login.css';
import Cookies from 'js-cookie';

const url = "https://eatd-8s2kk.ondigitalocean.app/";



class Login extends React.Component {
    render() {
        return (
            <div id="Login">
                <form className="container vertical wireframe item" onSubmit={this.props.loginCheck}>
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