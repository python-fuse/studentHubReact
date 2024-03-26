import { Center, IconButton, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Post from "./Post";
import { useNavigate, useParams } from "react-router-dom";
import useFetchPost from "../hooks/useFetchPost";
import { FaArrowLeft } from "react-icons/fa";
import CommenttList from "./CommenttList";
import NewComment from "./NewComment";

const CommentPage = () => {
  const { uid, postId } = useParams();
  const { fetchPost, post, loading } = useFetchPost();
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      fetchPost(uid, postId);
    }
    console.log(post);
  }, []);

  return (
    <VStack spacing="4" align="stretch" p="4" maxW="md" mx="auto">
      <IconButton
        icon={<FaArrowLeft />}
        colorScheme="blue"
        w={10}
        onClick={() => navigate(-1)}
        size={"sm"}
      />
      {post ? (
        <Post post={post} />
      ) : (
        <Center>
          {" "}
          <Spinner size={"xl"} alignSelf={"center"} />
        </Center>
      )}
 
      <NewComment postId={postId}/>
      <CommenttList postId={postId} />
    </VStack>
  );
};

export default CommentPage;
