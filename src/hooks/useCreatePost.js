import { useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPost = async (currentUser, postContent, image) => {
    setLoading(true);
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const postRef = collection(userDocRef, "posts");
      let imageUrl = "";
      if (image) {
        const imageRef = ref(
          storage,
          `postImages/${currentUser.uid}/${image.name}`
        );
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }
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
        image: imageUrl ? imageUrl : "",
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
