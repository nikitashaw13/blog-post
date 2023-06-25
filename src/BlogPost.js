import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState("");
  const [comments, setComments] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const postData = await postResponse.json();
        setPost(postData);

        const authorResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
        const authorData = await authorResponse.json();
        setAuthor(authorData);

        const commentResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        const commentData = await commentResponse.json();
        setComments(commentData);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const addtoFavorites = () => {
    const favorites = localStorage.getItem("favorites");

    if (favorites) {
      const existingFavorites = JSON.parse(favorites);
      const updatedFavorites = [...existingFavorites, post];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const newFavorites = [post];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Link to="/">
          <h4>Back</h4>
        </Link>
        <button
          onClick={() => {
            addtoFavorites();
          }}
        >
          {" "}
          Add to Favorite
        </button>
      </div>

      <h2>{post.title}</h2>
      <h3>Author : {author.name}</h3>
      <p>{post.body}</p>
      {comments ? (
        <div>
          <h3>{comments.length} Comments</h3>
          {comments.map((comment) => (
            <li>
              {comment.name}
              <div>
                <span>{comment.email}</span>
                <div>{comment.body}</div>
              </div>
            </li>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BlogPost;
