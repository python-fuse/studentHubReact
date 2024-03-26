import { useState } from "react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { useToast } from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";

export default function useUpdateProfile(uid) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const updateAvatar = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        status: "error",
        duration: 3000,
      });
      return;
    }
    try {
      console.log(file);
      setLoading(true);
      const fileRef = ref(storage, "avatars/" + uid);
        console.log(fileRef);
      await uploadBytes(fileRef,file);

      const imgUrl = await getDownloadURL(fileRef);
      const userRef = doc(db, "users", uid);
      console.log(userRef);
      await updateDoc(userRef, {
        avatar: imgUrl,
      });

      toast({
        status: "success",
        description: "Profile updated",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false)
    } catch (e) {
      toast({
        status: "error",
        title: "An error occurred",
        description: e.message,
        duration: 3000,
        isClosable: true,
      });
      console.log(e);
      setLoading(false);
    }
  };
  return { setFile, updateAvatar, loading };
}
