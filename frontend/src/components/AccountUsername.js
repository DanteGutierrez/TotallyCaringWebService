import React from 'react';

class Username extends React.Component {
    render() {
        return (
            <form className="container vertical maxWidth maxHeight" onSubmit={this.props.onSubmit}>
                <input type="hidden" name="password" value={this.props.account.password} />
                <label htmlFor="name" className="item">Name: </label>
                <input type="text" name="name" placeholder="name" className="item"/>
                <input type="submit" value="Change Username" className="item"/>
            </form>
        )
    }
}

export default Username;