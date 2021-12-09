import React from 'react';
import './Login.css';

class Login extends React.Component {
    render() {
        return (
            <div id="Login">
                <form className="container vertical wireframe item" onSubmit={this.props.onSubmit}>
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