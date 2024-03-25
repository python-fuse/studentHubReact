import { Box, Button, Center, Divider, Flex, Textarea } from "@chakra-ui/react";
import React from "react";

import NewPost from "./NewPost";
import Header from "./Header";
import Posts from "./Posts";
import { useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import Sidebar from "./Sidebar";

const Home = () => {
  const { currentUser } = useAuth();
  const { user, loading } = useUser(currentUser.uid);

  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  });
  return (
    <>
      <NewPost />
      <Posts />
    </>
  );
};

export default Home;
