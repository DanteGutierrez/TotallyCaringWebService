import React from 'react';
import './accountInfo.css';

const testAccountId = "619701f533df0fcbaa0dd865";

const url = "https://eatd-8s2kk.ondigitalocean.app/api/users/";

class BasicInformation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="BasicInfo" className="container horiztonal spaceEvenly wireframe">
                <img src="" alt="Profile Picture Here" id="Picture" className="item wireframe"></img>
                <div id="Name" className="item">
                    {this.props.account.name}
                </div>
            </div>

        );
    };
}

class MenuOption extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="option item wireframe">
                {this.props.option}
            </div>
        );
    };

}

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="SideMenu" className="container vertical item wireframe">
                {this.props.config.options.map(option => {
                    return (<MenuOption key={option} option={option} />);
                })}
            </div>
        );
    };
}

class DisplayConfigurations extends React.Component {
    render() {
        return (
            <div id="DisplayConfig" className="container vertical item wireframe maxWidth maxHeight">
                Hello World!
            </div>
        );
    };
}

class InteractiveAccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {
                selected: "Reviews",
                options: [
                    "Reviews",
                    "Favorites",
                    "Edit Username",
                    "Upload Picture"
                ]
            }
        };
    }
    render() {
        return (
            <div id="InteractiveAccountView" className="container horizontal spaceEvenly item wireframe maxWidth maxHeight">
                <SideMenu config={this.state.config} />
                <DisplayConfigurations config={this.state.config} />
            </div>
        );
    };
}

class Frame extends React.Component {
    constructor() {
        super();
        this.state = { userInformation: [] };
    }
    componentDidMount() {
        fetch(url + testAccountId)
            .then(res => res.json())
            .then(json => this.setState({ userInformation: json }));
    }
    render() {
        return (
            <div id="Frame" className="container vertical maxWidth maxHeight item wireframe">
                <BasicInformation account={this.state.userInformation} />
                <InteractiveAccountView />
            </div>
        );
    };
}

class AccountInformation extends React.Component {
    render() {
        return (
            <Frame />
        )
    }
}

export default AccountInformation;