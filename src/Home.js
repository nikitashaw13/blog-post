import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      <Link to="./favorites">
        <h3>Wishlist</h3>
      </Link>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
