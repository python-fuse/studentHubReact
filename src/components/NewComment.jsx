import { Avatar, Box, Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import useUser from "../hooks/useUser";
import { useAuth } from "../auth/AuthProvider";
import { useAddComment } from "../hooks/useAddComment";

const NewComment = ({ postId }) => {
  const { currentUser, loading: authLoading } = useAuth();
  const { user } = useUser(currentUser.uid);

  const [commentText, setCommentText] = useState("");
  const { isLoading, addComment } = useAddComment({
    postId: postId,
    userId: user?.id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(commentText);
    setCommentText("");
  };

  return (
    <Box w={"100%"} mx={"auto"} py={6}>
      <Flex>
        <Avatar name={user?.username} src={user?.avatar} size={"sm"} />
        <Box flex={1} ml={4}>
          <form onSubmit={handleSubmit}>
            <Box>
              <Input
                size={"sm"}
                variant={"flushed"}
                autoComplete="false"
                placeholder="Your thought..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </Box>
            <Flex pt={2}>
              <Button
                type="submit"
                colorScheme={"blue"}
                size={"xs"}
                ml={"auto"}
                isLoading={isLoading || authLoading}
              >
                Send
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default NewComment;
