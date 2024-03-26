import {
  Avatar,
  Button,
  Divider,
  HStack,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import useFetchUserPosts from "../hooks/useFetchUserPosts";
import { useAuth } from "../auth/AuthProvider";
import Post from "./Post";
import useUser from "../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { formatDate } from "date-fns";
import EditProfile from "./EditProfile";

const Profile = () => {
  const { uid } = useParams();
  const { currentUser } = useAuth();
  const { user } = useUser(uid);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <HStack px={20} align={'left'} gap={4} w={"100%"}>
        <Avatar size={['lg',"xl"]} name={user?.username} src={user?.avatar} />
        <VStack align={"start"}>
          <Text fontSize={['lg',"2xl"]} fontWeight={"bold"}>
            {user?.username}
          </Text>
          <HStack w={'max-content'}>
            <Text fontSize={['md',"lg"]}>Posts: {posts.length}</Text>
            <Text fontSize={['sm',"2xl"]} >
              Joined:{" "}
              {user
                ? formatDate(new Date(user?.date), "dd MMMM yyyy")
                : "Loading..."}
            </Text>
          </HStack>
        </VStack>
        {currentUser.uid == uid ? (
          <Button
            size={["sm", "md"]}
            mb={2}
            ml={"auto"}
            colorScheme="blue"
            onClick={onOpen}
          >
            Edit profile
          </Button>
        ) : (
          ""
        )}
      </HStack>
      <Divider  my={5} />

      <EditProfile isOpen={isOpen} onClose={onClose} user={user} />

      <VStack spacing="4" align="stretch" p="4" w={['md','lg']} mx="auto">
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <Text textAlign={"center"}>No posts yet...</Text>
        )}
      </VStack>
    </VStack>
  );
};

export default Profile;
