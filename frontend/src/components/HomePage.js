import React from 'react';
import './HomePage.css';

const url = "https://eatd-8s2kk.ondigitalocean.app/yelp/businesses";

const term = "Burgers";
const location = "Salt Lake City, UT";

let search = {
    term: term,
    location: location
};

class CategoryCard extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="categoryCard">
                {this.props.title}
            </div>
        )
    }
}

class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="card contents container horizontal item spaceEvenly wireframe">
                <div className="smallImage item container vertical">
                    <img src={this.props.restaurant.image_url} className="restaurantImage"/>
                </div>
                <div className="item cardText container vertical">
                    <a href={this.props.restaurant.url} className="item noTextDecoration wireframe">
                        <div>{this.props.restaurant.name}</div>
                    </a>
                    <div className="container horizontal spaceBetween maxWidth">
                        <img src={"./ratings/" + this.props.restaurant.rating + ".png"} className="ratingImage" />
                        <div className="categoryContainer container horizontal spaceEvenly">
                            {this.props.restaurant.categories.map(category => {
                                return (
                                    <CategoryCard key={category.alias} title={category.title}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <a href={this.props.restaurant.url} className="item noTextDecoration wireframe">&nbsp;&#10247;</a>
            </div>
        )
    }
}

class CardHost extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="CardHost" className="container vertical wireframe">
                {this.props.restaurants.map(restaurant => {
                    return (
                        <Card key={restaurant.id} restaurant={restaurant} />
                    )
                })}
            </div>
        )
    }
}

class HomeFrame extends React.Component {
    constructor() {
        super();
        this.state = { restaurantInformation: [] };
    }
    componentDidMount() {
        fetch(url, {method: "POST", body: new URLSearchParams(search)})
            .then(res => res.json())
            .then(json => this.setState({ restaurantInformation: json }));
    }
    render() {
        return (
            <div id="HomeFrame" className="container vertical maxWidth maxHeight wireframe">
                <CardHost restaurants={this.state.restaurantInformation} />
            </div>
        );
    };
}


class HomePage extends React.Component {
    render() {
        return (
            <HomeFrame />
        )
    }
}

export default HomePage;
