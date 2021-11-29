import React from 'react';
import "./AccountReviews.css";

class Review extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount() {
        // fetch(this.props.url + "api/users/" + this.props.review.userid)
        //     .then(res => res.json())
        //     .then(json => this.setState({ username: json.name }));
    }
    render() {
        return (
            <div className="container horiztonal wireframe item">
                <img src="./profilePicture.jpg" alt="Profile" className="reviewProfile item"/>
                <div className="reviewContent container vertical item">
                    {this.props.account.name}
                    <img src={"./ratings/" + this.props.review.rating + ".png"} alt="rating" className="reviewRating item" />
                    <div className="item wireframe">
                        {this.props.review.comment}
                    </div>
                </div>
            </div>
        )
    }
}

class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userReviews: [],
        };
    }
    
    componentDidMount() {
        fetch(this.props.url + "api/reviews/search?userid=" + this.props.accountId)
            .then(res => res.json())
            .then(json => this.setState({ userReviews: json }));
    }
    render() {
        return (
            <div id="ReviewFrame" className="item wireframe maxWidth maxHeight">
                {this.state.userReviews.map(review => {
                    return (<Review key={review._id} url={this.props.url} review={review} account={this.props.account}/>)
                })}
            </div>
        )    
    }
}

export default Reviews;