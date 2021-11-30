import React from 'react';

class ProfilePicture extends React.Component {
    render() {
        return (
            <form className="container vertical maxWidth maxHeight" onSubmit={this.props.onSubmit}>
                <input type="hidden" name="name" value={this.props.account.name} />
                <label htmlFor="password" className="item">Password: </label>
                <input type="text" name="password" placeholder="Password" className="item" />
                <input type="submit" value="Change Password" className="item" />
            </form>
        )
    }
}

export default ProfilePicture;