import { collection, doc, getDoc, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

export default function useUser(userId) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const userRef = doc(db, "users", userId);
      setLoading(true);

      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        setUser(userSnapshot.data());
        setLoading(false);
      } else {
        return "loading...";
      }
      setLoading(false);
    };

    getUser();
  }, [user]);
  return { user, isLoading };
}
