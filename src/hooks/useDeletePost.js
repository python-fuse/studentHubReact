import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useToast } from "@chakra-ui/react";

const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();


  const deletePost = async (postOwner, postId) => {
    const postRef = doc(db, "users", postOwner, "posts", postId);
    try {
      setLoading(true);
      await deleteDoc(postRef);
      setLoading(false);

      toast({
        title: "Post deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      return true;
    } catch (e) {
      setError("Failed to delete post, Please try again.");
      setLoading(false);
      toast({
        title: "Coul'nt delete the post, Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
  };
  return { deletePost, loading, error };
};
export default useDeletePost;
