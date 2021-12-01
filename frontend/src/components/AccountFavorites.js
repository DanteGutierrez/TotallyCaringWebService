import React from 'react';
import './AccountFavorites.css';

class Favorite extends React.Component {
    render() {
        return (
            <div className="item container wireframe">
                {this.props.favorite.restaurantid}
            </div>
        )
    }
}

class Favorites extends React.Component {
    render() {
        return (
            <div id="favoriteFrame" class="item maxHeight">
                {this.props.favorites.map(favorite => {
                    return <Favorite/>
                })}
            </div>
        )
    }
}

export default Favorites;