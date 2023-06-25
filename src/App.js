import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import BlogPost from "./BlogPost";
import Favorites from "./Favorites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:postId" element={<BlogPost />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
