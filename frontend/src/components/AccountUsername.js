import React from 'react';
import './AccountUsername.css';

class Username extends React.Component {
    render() {
        return (
            <div id="changeUsername" className="item maxHeight">
                <form  className="container vertical item" onSubmit={this.props.onSubmit}>
                    <input type="hidden" name="password" value={this.props.account.password} />
                    <label htmlFor="name" className="item">Name: </label>
                    <input type="text" name="name" placeholder="Name" className="item"/>
                    <input type="submit" value="Change Username" className="item"/>
                </form>
            </div>
        )
    }
}

export default Username;