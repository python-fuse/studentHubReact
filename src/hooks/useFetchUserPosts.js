import {collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

const useFetchUserPosts = (userId) => {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setpotsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserPosts = async () => {
      const userRef = doc(db, "users", userId);
      const postsRef = collection(userRef, "posts");

      try {
        setpotsLoading(true);
        const snapShot = await getDocs(postsRef);
        if (snapShot) {
          let allposts = [];

          snapShot.forEach((doc) => {
            allposts.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          setPosts(allposts);
          setpotsLoading(false);
        }
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };

    fetchUserPosts(userId)
  }, [userId]);
  return { posts, postsLoading, error };
};

export default useFetchUserPosts;
