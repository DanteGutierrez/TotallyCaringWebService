import React from 'react';
import './AccountPassword.css';

class Password extends React.Component {
    render() {
        return (
            <div id="changePassword" className="item maxHeight">
                <form className="container item vertical" onSubmit={this.props.onSubmit}>
                    <input type="hidden" name="name" value={this.props.account.name} />
                    <label htmlFor="password" className="item">Password: </label>
                    <input type="text" name="password" placeholder="Password" className="item" />
                    <input type="submit" value="Change Password" className="item" />
                </form>
            </div>
        )
    }
}

export default Password;