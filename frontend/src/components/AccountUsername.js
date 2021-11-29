import React from 'react';

class Username extends React.Component {
    handleSubmission(evt) {
        evt.preventDefault();
        let form = {
            name: evt.target.name.value,
            password: evt.target.password.value
        }
        fetch(this.props.url + "api/users/" + this.props.accountId, { method: "PUT", body: new URLSearchParams(form) })
        .then(window.location.reload())
    }
    render() {
        return (
            <form className="container vertical maxWidth maxHeight" onSubmit={evt => this.handleSubmission(evt)}>
                <input type="hidden" name="password" value={this.props.account.password} />
                <label htmlFor="name" className="item">Name: </label>
                <input type="text" name="name" placeholder="name" className="item"/>
                <input type="submit" value="Change Username" className="item"/>
            </form>
        )
    }
}

export default Username;