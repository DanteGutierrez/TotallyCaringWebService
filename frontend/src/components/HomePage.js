import React from 'react';
import './HomePage.css';



class CategoryCard extends React.Component {
    render() {
        return (
            <div className="categoryCard">
                {this.props.title}
            </div>
        )
    }
}

class Card extends React.Component {
    render() {
        return (
            <div className="card contents container horizontal item spaceEvenly rounded">
                <div className="smallImage item container vertical">
                    <img src={this.props.restaurant.image_url} alt="Restaurant" className="restaurantImage"/>
                </div>
                <div className="item cardText container vertical">
                    <a href={this.props.restaurant.url} className="item noTextDecoration">
                        <div>{this.props.restaurant.name}</div>
                    </a>
                    <div className="container horizontal spaceBetween maxWidth">
                        <img src={"./ratings/" + this.props.restaurant.rating + ".png"} alt="Rating" className="ratingImage" />
                        <div className="categoryContainer container horizontal spaceEvenly">
                            {this.props.restaurant.categories.map(category => {
                                return (
                                    <CategoryCard key={category.alias} title={category.title}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <a href={this.props.restaurant.url} className="item noTextDecoration">&nbsp;&#10247;</a>
            </div>
        )
    }
}

class CardHost extends React.Component {
    render() {
        return (
            <div id="CardHost" className="container vertical">
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
    render() {
        return (
            <div id="HomeFrame" className="container vertical maxWidth maxHeight">
                <CardHost restaurants={this.props.restaurants} />
            </div>
        );
    };
}


class HomePage extends React.Component {
    render() {
        return (
            <HomeFrame restaurants={this.props.restaurants}/>
        )
    }
}

export default HomePage;
