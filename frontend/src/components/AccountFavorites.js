import React from 'react';
import './AccountFavorites.css';

class Favorite extends React.Component {
    render() {
        return (
            <div className="item container horizontal wireframe">
                {this.props.favorite.restaurantid}
                <button onClick={this.props.onClick} className="favoriteButton item">
                    <img src="trashFavorites.png" alt={this.props.favorite._id} className="maxHeight maxWidth"/>
                </button>
            </div>
        )
    }
}

class Favorites extends React.Component {
    render() {
        return (
            <div id="favoriteFrame" className="item maxHeight">
                {
                    this.props.favorites.map(favorite => {
                        return <Favorite key={favorite._id} favorite={favorite} onClick={this.props.onClick}/>
                    })
                }
            </div>
        )
    }
}

export default Favorites;