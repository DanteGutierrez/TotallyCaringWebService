import React from 'react';
import "./AccountReviews.css";

class Review extends React.Component {
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
    render() {
        return (
            <div id="ReviewFrame" className="item wireframe maxWidth maxHeight">
                {this.props.reviews.map(review => {
                    return (<Review key={review._id} review={review} account={this.props.account}/>)
                })}
            </div>
        )    
    }
}

export default Reviews;