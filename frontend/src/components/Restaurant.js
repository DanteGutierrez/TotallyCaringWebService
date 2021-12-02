import React from 'react';
import './Restaurant.css';

const url = "https://eatd-8s2kk.ondigitalocean.app/";

class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: "61a824262bb8570c19e9e7d6",
            user: [],
            restaurant: []
        }
        this.getRestaurant = this.getRestaurant.bind(this);
        this.getUser = this.getUser.bind(this);
    }
    getUser = () => {
        fetch(url + "api/users/" + this.state.userid)
            .then(res => res.json())
            .then(json => this.setState({ user: json }, () => console.log(this.state.user)));
    }
    getRestaurant = () => {
        fetch(url + "yelp/singlebusiness/", { method: "POST", body: new URLSearchParams({restaurantid: this.props.params.id})})
            .then(res => res.json())
            .then(json => this.setState({restaurant: json}, () => console.log(this.state.restaurant)))
    }
    addReview = (evt) => {
        evt.preventDefault();
        let review = {
            restaurantid: this.state.restaurant.id,
            userid: this.state.userid,
            restaurantname: this.state.restaurant.name,
            comment: evt.target.comment.value,
            rating: evt.target.rating.value
        }
        fetch(url + "api/reviews/create", { method: "POST", body: new URLSearchParams(review) });
    }
    componentDidMount() {
        this.getRestaurant();
        this.getUser();
    }
    render() {
        return (
            <div id="RestaurantCard" className="container horizontal maxWidth maxHeight wireframe">
                <div className="smallRestaurantImage item wireframe">
                    <img src={this.state.restaurant.image_url} alt="Restaurant" className="maxHeight"/>
                </div>
                <div id="RestaurantHeader" className="container vertical maxWidth item spaceEvenly wireframe">
                    <div className="restaurantBigName item wireframe maxWidth">
                        {this.state.restaurant.name}
                    </div>
                    <div className="restaurantRatingView container horizontal item wireframe maxWidth">
                        <img src={"./ratings/" + this.state.restaurant.rating + ".png"} alt={this.state.restaurant.rating + " star rating"} />
                    </div>
                    <form className="addReview container horizontal wireframe item maxWidth" onSubmit={evt => this.addReview(evt)}>
                        <label htmlFor="comment">Comment: </label>
                        <input type="text" name="comment" placeholder="Leave a Comment!" required={true} className="item" />
                        <label htmlFor="rating">Rating: </label>
                        <input type="range" name="rating" min="1" max="5" step="1" defaultValue="4" className="item" />
                        <input type="submit" value="Comment!"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Restaurant;