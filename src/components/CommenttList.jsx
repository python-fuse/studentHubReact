import React from "react";
import { Text, VStack } from "@chakra-ui/react";
import  useComments from "../hooks/useFetchComments";
import Comment from "./Comment";

const CommenttList = ({ postId }) => {
  const { comments, loading: commentLoading, error } = useComments(postId);
  if (commentLoading) return 'Loading...'
  return <VStack spacing={4} align={'stretch'} w={'100%'} >{comments?.map((comment) => <Comment key={comment.id} comment={comment}/>)}</VStack>;
};

export default CommenttList;
