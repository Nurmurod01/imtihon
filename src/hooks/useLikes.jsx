import { useState, useEffect } from "react";

export function useLikes() {
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likes") || "[]");
    setLiked(savedLikes);
  }, []);

  const toggleLike = (productId) => {
    let newLikes;
    if (liked.includes(productId)) {
      newLikes = liked.filter((id) => id !== productId);
    } else {
      newLikes = [...liked, productId];
    }

    setLiked(newLikes);
    localStorage.setItem("likes", JSON.stringify(newLikes));
  };

  return { liked, toggleLike };
}
