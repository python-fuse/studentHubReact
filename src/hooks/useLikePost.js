import { useState } from "react";
import { db } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const useLikePost = (postOwnerId, postId, isLiked, uid) => {
  const [isLoading, setLoading] = useState(false);
  const toggleLike = async () => {
    try {
      setLoading(true);
      const userRef = doc(db, "users", postOwnerId);
      const postRef = doc(userRef, "posts", postId);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return { toggleLike, isLoading };
};

export default useLikePost;
