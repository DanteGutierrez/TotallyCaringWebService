import React from 'react';
import './AccountInformation.css';
import Reviews from './AccountReviews';
import Favorites from './AccountFavorites';
import Username from './AccountUsername';
import ProfilePicture from './AccountProfilePicture';

const testAccountId = "619c4120d9efc262d8d3bb4b";

const url = "https://eatd-8s2kk.ondigitalocean.app/";


class BasicInformation extends React.Component {
    render() {
        return (
            <div id="BasicInfo" className="container horiztonal spaceEvenly wireframe">
                <img src="./profilePicture.jpg" alt="Profile" id="Picture" className="item"></img>
                <div id="Name" className="item">
                    {this.props.account.name}
                </div>
            </div>

        );
    };
}

class MenuOption extends React.Component {
    render() {
        return (
            <button className={"option item wireframe" + (this.props.selected === this.props.option ? " selected" : "")} onClick={this.props.onClick}>
                {this.props.option}
            </button>
        );
    };

}

// class SideMenu extends React.Component {
//     render() {
//         return (
            
//         );
//     };
// }

class DisplayConfigurations extends React.Component {
    render() {
        let selectedView;
        switch (this.props.selected) {
            case "Reviews":
                selectedView = <Reviews url={url} accountId={testAccountId} account={this.props.account}/>;
                break;
            case "Favorites":
                selectedView = <Favorites url={url} accountId={testAccountId} account={this.props.account}/>;
                break;
            case "Edit Username":
                selectedView = <Username url={url} accountId={testAccountId} account={this.props.account}/>;
                break;
            case "Upload Picture":
                selectedView = <ProfilePicture url={url} accountId={testAccountId} account={this.props.account}/>;
                break;
            default:
                break;
        }
        return (
            <div id="DisplayConfig" className="wireframe maxWidth maxHeight">
                {selectedView}
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
    handleMenuSwitch(item) {
        console.log("clicked!")
        this.setState({
            config: {
                selected: item,
                options: [
                    "Reviews",
                    "Favorites",
                    "Edit Username",
                    "Upload Picture"
                ]
            }
        })
    }
    render() {
        return (
            <div id="InteractiveAccountView" className="container horizontal spaceEvenly wireframe maxWidth maxHeight">
                <div id="SideMenu" className="container vertical wireframe">
                    {this.state.config.options.map(option => {
                        return (<MenuOption key={option} option={option} onClick={evt => this.handleMenuSwitch(option)} selected={this.state.config.selected} />);
                    })}
                </div>
                <DisplayConfigurations selected={this.state.config.selected} account={this.props.account}/>
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
        fetch(url + "api/users/" + testAccountId)
            .then(res => res.json())
            .then(json => this.setState({ userInformation: json }));
    }
    render() {
        return (
            <div id="Frame" className="container vertical maxWidth maxHeight wireframe">
                <BasicInformation account={this.state.userInformation} />
                <InteractiveAccountView account={this.state.userInformation}/>
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