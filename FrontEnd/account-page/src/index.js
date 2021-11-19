import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const testAccountId = "619701f533df0fcbaa0dd865";

const url = "http://localhost:8080/api/users/";

class BasicInformation extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id="BasicInfo" class="container horiztonal spaceEvenly">
                <img src="" alt="Profile Picture Here" id="Picture" class="item"></img>
                <div id="Name" class="item">
                    {this.props.account.name}
                </div>
            </div>
            
        )
    }
}

class Frame extends React.Component {
    constructor() {
        super();
        this.state = { data: [] };
    }
    componentDidMount() {
        fetch(url + testAccountId)
            .then(res => res.json())
            .then(json => this.setState({ data: json }));
        console.log(this.state.data);
    }
    render() {
        
        return (
            <BasicInformation account={this.state.data} />
        )
    }
}


ReactDOM.render(
    <Frame />,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
