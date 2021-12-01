import React from 'react';

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
            <div id="FavoriteFrame" class="item wireframe maxHeight maxWidth">
                {this.props.favorites.map(favorite => {
                    return <Favorite/>
                })}
            </div>
        )
    }
}

export default Favorites;