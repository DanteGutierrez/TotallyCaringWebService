import React from 'react';
import "./AccountReviews.css";

class Review extends React.Component {
    render() {
        return (
            <div className="container horiztonal item reviewCard">
                <img src="./profilePicture.jpg" alt="Profile" className="reviewProfile item"/>
                <div className="reviewContent container vertical item">
                    <div className="restaurantName">
                        {this.props.review.restaurantname}
                    </div>
                    <img src={"./ratings/" + this.props.review.rating + ".png"} alt="rating" className="reviewRating item" />
                    <div className="reviewerName">
                        {this.props.review.username}
                    </div>
                    <div className="item">
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
            <div id="ReviewFrame" className="item maxHeight">
                {this.props.reviews.map(review => {
                    return (<Review key={review._id} review={review}/>)
                })}
            </div>
        )    
    }
}

export default Reviews;