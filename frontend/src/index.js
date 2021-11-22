import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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
                    return (<MenuOption key={option} option={option}/>);
                })}
            </div>
        );
    };
}

class DisplayConfigurations extends React.Component {
    render() {
        return (
            <div id="DisplayConfig" className="container vertical item wireframe max">
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
                selected: "reviews",
                options: [
                    "reviews",
                    "favorites",
                    "edit Username",
                    "upload Picture"
                ]
            }
        };
    }
    render() {
        return (
            <div id="InteractiveAccountView" className="container horizontal spaceEvenly item wireframe max">
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
            <div id="Frame" className="container vertical max item wireframe">
                <BasicInformation account={this.state.userInformation} />
                <InteractiveAccountView />
            </div>
        );
    };
}


ReactDOM.render(
    <Frame />,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
