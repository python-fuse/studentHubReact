import {
  doc, setDoc
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/firebase";
import { useToast } from "@chakra-ui/react";

export function useAddComment({ postId, userId }) {
  const [isLoading, setLoading] = useState(false);

  const toast = useToast();
  const addComment = async (text) => {
    if (text.length === 0) {
      toast({
        title: "Comment can't be empty",
        duration: 3000,
        status: "warning",
        position: "top",
      });

      return;
    }
    try {
      setLoading(true);
      const id = crypto.randomUUID();
      const date = Date.now();
      const docRef = doc(db, "comments", id);
      await setDoc(docRef, { text, postId, userId, date, id });

      toast({
        title: "Comment added.",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 3000,
      });

      setLoading(false);
    } catch (e) {
      toast({
        title: "An error occured.Try again.",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 3000,
      });
      setLoading(false);
    }
  };
  return { isLoading, addComment };
}


