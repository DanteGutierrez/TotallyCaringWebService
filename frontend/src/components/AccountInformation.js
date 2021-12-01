import React from 'react';
import './AccountInformation.css';
import Reviews from './AccountReviews';
import Favorites from './AccountFavorites';
import Username from './AccountUsername';
import Password from './AccountPassword';

const url = "https://eatd-8s2kk.ondigitalocean.app/";


class BasicInformation extends React.Component {
    render() {
        return (
            <div id="BasicInfo" className="container horiztonal spaceEvenly">
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
            <button className={"option item" + (this.props.selected === this.props.option ? " selected" : "")} onClick={this.props.onClick}>
                {this.props.option}
            </button>
        );
    };

}

class DisplayConfigurations extends React.Component {
    render() {
        let selectedView;
        switch (this.props.selected) {
            case "Reviews":
                selectedView = <Reviews account={this.props.account} reviews={this.props.reviews}/>;
                break;
            case "Favorites":
                selectedView = <Favorites url={url} account={this.props.account} favorites={this.props.favorites}/>;
                break;
            case "Edit Username":
                selectedView = <Username url={url} account={this.props.account} onSubmit={this.props.onSubmit}/>;
                break;
            case "Edit Password":
                selectedView = <Password url={url} account={this.props.account} onSubmit={this.props.onSubmit}/>;
                break;
            default:
                break;
        }
        return (
            <div id="DisplayConfig" className="maxWidth maxHeight">
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
                    "Edit Password"
                ]
            }
        };
    }
    handleMenuSwitch(item) {
        this.setState({
            config: {
                selected: item,
                options: [
                    "Reviews",
                    "Favorites",
                    "Edit Username",
                    "Edit Password"
                ]
            }
        })
    }
    render() {
        return (
            <div id="InteractiveAccountView" className="container horizontal spaceEvenly maxWidth maxHeight">
                <div id="SideMenu" className="container vertical">
                    {this.state.config.options.map(option => {
                        return (<MenuOption key={option} option={option} onClick={evt => this.handleMenuSwitch(option)} selected={this.state.config.selected} />);
                    })}
                </div>
                <DisplayConfigurations selected={this.state.config.selected} account={this.props.account} reviews={this.props.reviews} favorites={this.props.favorites} onSubmit={this.props.onSubmit}/>
            </div>
        );
    };
}
class Frame extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: "619c4120d9efc262d8d3bb4b",
            userInformation: [],
            userReviews: [],
            userFavorites: []
        };
        this.handleSubmission = this.handleSubmission.bind(this);
    }
    getAccountInfo = async () => {
        return fetch(url + "api/users/" + this.state.userId)
            .then(res => res.json());
    }
    getReviews = async () => {
        return fetch(url + "api/reviews/search?userid=" + this.state.userId)
            .then(res => res.json());
    }
    getFavorites = async () => {
        return fetch(url + "api/favorites/search?userid=" + this.state.userId)
            .then(res => res.json());
    }
    handleSubmission = (evt) => {
        evt.preventDefault();
        let form = {
            name: evt.target.name.value,
            password: evt.target.password.value
        }
        fetch(url + "api/users/" + this.state.userId, { method: "PUT", body: new URLSearchParams(form) })
            .then(res => fetch(res.url)
                .then(res => res.json())
                .then(json => this.setState({ userInformation: json }, () => console.log(this.state.userInformation)))
            )
    }
    componentDidMount() {
        Promise.all([this.getAccountInfo(), this.getReviews(), this.getFavorites()])
            .then(([account, reviews, favorites]) => {
                this.setState({userInformation: account, userReviews: reviews, userFavorites: favorites})
        })
    }
    render() {
        return (
            <div id="Frame" className="container vertical maxWidth maxHeight">
                <BasicInformation account={this.state.userInformation} />
                <InteractiveAccountView account={this.state.userInformation} reviews={this.state.userReviews} favorites={this.state.userFavorites} onSubmit={evt => this.handleSubmission(evt)}/>
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