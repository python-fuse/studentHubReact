import { Avatar, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import React from "react";
import useFetchUserPosts from "../hooks/useFetchUserPosts";
import { useAuth } from "../auth/AuthProvider";
import Post from "./Post";
import useUser from "../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { formatDate } from "date-fns";

const Profile = () => {
  const { uid } = useParams();
  const { user } = useUser(uid);
  const navigate = useNavigate();


  const { posts, postsLoading, error } = useFetchUserPosts(uid);
  if (postsLoading) return "Loading...";

  return (
    <VStack w={"100%"} p={2} align={"start"}>
      <IconButton
        icon={<FaArrowLeft />}
        colorScheme="blue"
        w={10}
        onClick={() => navigate(-1)}
        size={"sm"}
      />
      <HStack px={20} gap={4}>
        <Avatar size={"xl"} name={user?.username} src={user?.avatar} />
        <VStack align={'start'}>
          <Text>{user?.username}</Text>
          <HStack>
            <Text>Posts: {posts.length}</Text>
            <Text>Joined: {user ? formatDate(new Date(user?.date), "dd MMMM yyyy"):'Loading...'}</Text>
          </HStack> 
        </VStack>
      </HStack>

      <VStack spacing="4" align="stretch" p="4" w={"lg"} mx="auto">
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <Text>No posts yet...</Text>
        )}
      </VStack>
    </VStack>
  );
};

export default Profile;
