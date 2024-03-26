import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import useCreatePost from "../hooks/useCreatePost";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [postContent, setPostContent] = useState("");

  const { currentUser } = useAuth();
  const { createPost, loading, error } = useCreatePost();
  const toast = useToast();
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    if (!currentUser) {
      toast({
        status: "warning",
        description: "Please Login to make a post.",
        duration: 1000,
      });

      navigate("/");
      return;
    }

    if (postContent.trim() === "") {
      toast({
        description: "Post content cannot be empty.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const success = await createPost(currentUser, postContent);
    if (success) {
      toast({
        title: "Success",
        description: "Post created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setPostContent("");
    } else {
      console.log(error);
      toast({
        title: "Error",
        description: error || "Failed to create post. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing="4" align="stretch" p="4" maxW="md" mx="auto">
      <FormControl>
        <FormLabel htmlFor="postContent">Add a new post</FormLabel>
        <Textarea
          id="postContent"
          value={postContent}
          colorScheme="blue"
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's on your mind?"
        />
      </FormControl>
      <Button
        onClick={handleCreatePost}
        isLoading={loading}
        loadingText="Creating"
        colorScheme="blue"
        alignSelf="flex-end"
      >
        Create Post
      </Button>
    </VStack>
  );
};

export default NewPost;
