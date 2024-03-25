import React from "react";
import {
  Box,
  Avatar,
  Text,
  IconButton,
  Icon,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { FaRegComment, FaRegHeart, FaTrash } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../auth/AuthProvider";
import useUser from "../hooks/useUser";
import useDeletePost from "../hooks/useDeletePost";
import { Link } from "react-router-dom";
import useComments from "../hooks/useFetchComments";

const Post = ({ post }) => {
  const { id, content, createdAt, userName, avatarURL, likes, userId } = post;
  const { currentUser } = useAuth();
  const { user } = useUser(userId);
  const { deletePost } = useDeletePost();

  const { comments } = useComments(id);

  const handleDelete = async () => {
    const success = await deletePost(userId, id);
  };

  const renderContent = (content) => {
    return content.split("\n").map((line, index) => {
      return (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      );
    });
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" mb="4" boxShadow="md">
      <Flex align="center" mb="2">
        <Avatar size="sm" name={avatarURL} src={user?.avatar} />
        <Box ml="2">
          <Text fontWeight="bold">{user?.username}</Text>
          <Text fontSize="xs" color="gray.500">
            @{user?.username}
          </Text>
        </Box>

        {userId === currentUser.uid ? (
          <IconButton
            aria-label="Delete"
            icon={<Icon as={FaTrash} />}
            variant="ghost"
            colorScheme="red"
            ml={"auto"}
            onClick={handleDelete}
          />
        ) : (
          ""
        )}
      </Flex>

      <Text>{renderContent(content)}</Text>
      <Flex mt="2" justify="space-between" align="center">
        <Text fontSize="sm" color="gray.500">
          {formatDistanceToNow(createdAt.toDate())} ago
        </Text>

        <Flex justify={'space-between'} >
          <Flex align={"center"} gap={0} >
            <IconButton
              aria-label="Like"
              icon={<Icon as={FaRegHeart} />}
              variant="ghost"
              colorScheme="primary"
              // onClick={handleLike}
            />
            <Text fontSize="sm" color="gray.500" m={0}>
              {likes.length}
            </Text>
          </Flex>

          <Flex align={"center"} gap={0}>
            <IconButton
              aria-label="Comment"
              icon={<Icon as={FaRegComment} />}
              variant="ghost"
              colorScheme="primary"
              mr="2"
              as={Link}
              to={`/posts/${userId}/${id}`}
            />

            <Text fontSize="sm" color="gray.500">
              {comments.length}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Post;
