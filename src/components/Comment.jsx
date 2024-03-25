import { Avatar, Code, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import useUser from "../hooks/useUser";
import { formatDistanceToNow } from "date-fns";

const Comment = ({ comment }) => {
  const { user } = useUser(comment.userId);
  return (
    <Flex
      w={"100%"}
      mt={"3px"}
      gap={3}
      p={2}
      rounded={"md"}
      boxShadow={"md"}
      borderWidth="1px"
    >
      <Avatar size={"md"} name={user?.username} src={user?.avatar} />
      <VStack w={"100%"} textAlign={"start"} align={"start"} maxH={"inherit"}>
        <VStack align={'start'} gap={0}>
          <Code fontSize={"sm"} fontWeight={"bold"}>
            @{user?.username}
          </Code>
          <Text fontSize={"xs"} color={"gray.500"} textAlign={'left'}>
            {formatDistanceToNow(comment.date)} ago
          </Text>
        </VStack>
        <Text fontSize={"sm"} width={"100%"} >
          {comment.text}
        </Text>
      </VStack>
    </Flex>
  );
};

export default Comment;
