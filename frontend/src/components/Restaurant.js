import React from 'react';
import './Restaurant.css';
import Review from './AccountReviews';

const url = "https://eatd-8s2kk.ondigitalocean.app/";

class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: [],
            reviews: [],
            isFavorite: false,
            favorite: [],
        }
        this.getRestaurant = this.getRestaurant.bind(this);
    }
    getFavorite = async () => {
        return fetch(url + "api/favorites/search?restaurantid=" + this.props.params.id + "&userid=" + this.props.userid)
            .then(res => res.json())
    }
    getRestaurant = async () => {
        return fetch(url + "yelp/singlebusiness/", { method: "POST", body: new URLSearchParams({restaurantid: this.props.params.id})})
            .then(res => res.json())
    }
    addReview = (evt) => {
        evt.preventDefault();
        let review = {
            restaurantid: this.state.restaurant.id,
            userid: this.props.userid,
            restaurantname: this.state.restaurant.name,
            comment: evt.target.comment.value,
            rating: evt.target.rating.value
        }
        fetch(url + "api/reviews/create", { method: "POST", body: new URLSearchParams(review) })
            .then(() => this.props.getReviews("restaruantid=" + this.state.restaurant.id)
                .then(json => {
                    this.setState({ reviews: json }, () => evt.target.reset())
                })
            )
    }
    favorite = evt => {
        if (this.state.isFavorite) {
            fetch(url + "api/favorites/" + this.state.favorite[0]._id, { method: "DELETE" })
                .then(() => {
                    this.getFavorite()
                        .then(json => {
                            if (json.length > 0) {
                                this.setState({ isFavorite: true, favorite: json })
                            }
                            else {
                                this.setState({ isFavorite: false, favorite: [] })
                            }
                        })
                })
        }
        else {
            fetch(url + "api/favorites/create", { method: "POST", body: new URLSearchParams({ restaurantid: this.props.params.id, userid: this.props.userid, restaurantname: this.state.restaurant.name }) })
                .then(() => {
                    this.getFavorite()
                        .then(json => {
                            if (json.length > 0) {
                                this.setState({ isFavorite: true, favorite: json })
                            }
                            else {
                                this.setState({ isFavorite: false, favorite: [] })
                            }
                        })
                })
        }
        
    }
    componentDidMount() {
        this.getRestaurant()
            .then(json => {
                this.setState({ restaurant: json }, () => {
                    this.getFavorite()
                        .then(json => {
                            let fav = json.length > 0;
                            let storage = json.length > 0 ? json : []
                            this.setState({ isFavorite: fav, favorite: storage }, () => {
                                this.props.getReviews("restaruantid=" + this.state.restaurant.id)
                                    .then(json => {
                                        this.setState({ reviews: json })
                                    })
                            })
                        })
                })
            })
        
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
                    <div className="restaurantRatingView container horizontal spaceBetween item wireframe maxWidth">
                        <img src={"./ratings/" + this.state.restaurant.rating + ".png"} alt={this.state.restaurant.rating + " star rating"} />
                        <button className="smallFavorite" onClick={evt => this.favorite(evt)}>
                            <img src={this.state.isFavorite ? "./favorited.png" : "./unfavorited.png"} alt="Favorite" className="favoriteButton maxHeight"/>
                        </button>
                    </div>
                    <form className="addReview container horizontal wireframe item maxWidth" onSubmit={evt => this.addReview(evt)}>
                        <label htmlFor="comment">Comment: </label>
                        <input type="text" name="comment" placeholder="Leave a Comment!" required={true} className="item" />
                        <label htmlFor="rating">Rating: </label>
                        <input type="range" name="rating" min="1" max="5" step="1" defaultValue="4" className="item" />
                        <input type="submit" value="Comment!"/>
                    </form>
                    <Review reviews={this.state.reviews}/>
                </div>
            </div>
        )
    }
}

export default Restaurant;