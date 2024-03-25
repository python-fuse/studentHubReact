import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useFetchPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPost = async (userId, postId) => {
    const postRef = doc(db, "users", userId, "posts", postId);

    try {
      setLoading(true);
      const docSnap = await getDoc(postRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
        setLoading(false);
      }
    } catch (e) {
      setError("Error fetching post.");
      setLoading(false);
    }
  };

  return { post, loading, setLoading, error, fetchPost };
};

export default useFetchPost;
