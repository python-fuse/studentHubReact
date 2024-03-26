import { useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPost = async (currentUser, postContent) => {
    setLoading(true);
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const postRef = collection(userDocRef, "posts");

      const newPost = {
        content: postContent,
        createdAt: new Date(),
        likes: [],
        comments: [],
        userName: currentUser.displayName
          ? currentUser.displayName
          : currentUser.email,
        avatarURL: currentUser.photoURL
          ? currentUser.photoURL
          : currentUser.email,
        userId: currentUser.uid,
      };
      await addDoc(postRef, newPost);
      setLoading(false);
      return true;
    } catch (err) {
      console.log(err);
      setError("Failed to create post, Please try again.");
      setLoading(false);
      return false;
    }
  };

  return { createPost, loading, error };
};
export default useCreatePost;
