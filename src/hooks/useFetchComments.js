import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  where, onSnapshot, orderBy
} from "firebase/firestore";

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, where("postId", "==", postId),orderBy('date','asc'));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let allComments = [];
        querySnapshot.forEach((doc) => {
          allComments.push({ ...doc.data(), id: doc.id });
        });
        setComments(allComments);
        setLoading(false);
      },
      (error) => {
        setError(error);
        console.log(error);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [postId]);

  return { comments, loading, error };
};

export default useComments;
