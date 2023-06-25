import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorite, setFavorites] = useState([]);

  useEffect(() => {
    const favoriteList = localStorage.getItem("favorites");
    if (favoriteList) {
      setFavorites(JSON.parse(favoriteList));
    }
  }, []);

  const removeFavorite = (postId) => {
    const updatedFavorites = favorite.filter((post) => post.id !== postId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  console.log(favorite);

  return (
    <div>
      <Link to="/">
        <h4>Back</h4>
      </Link>
      <h1>Favorite Blog Posts</h1>
      {favorite.length === 0 ? (
        <p>No favorite posts</p>
      ) : (
        favorite.map((fav) => (
          <div>
            <h3>{fav.title}</h3>
            <div>{fav.body}</div>
            <button onClick={() => removeFavorite(fav.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
