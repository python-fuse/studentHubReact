import { useState, useEffect } from "react";
import {
  collectionGroup, query,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const useFetchAllPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const allPostsQuery = query(
        collectionGroup(db, "posts"),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(
        allPostsQuery,
        (querySnapshot) => {
          let allPosts = [];
          querySnapshot.forEach((doc) => {
            allPosts.push({ ...doc.data(), id: doc.id });
          });

          setPosts(allPosts);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching posts:", error);
          setError("Failed to fetch posts. Please try again.");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export default useFetchAllPosts;
