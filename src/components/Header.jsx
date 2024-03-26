import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { FaUser } from "react-icons/fa";
import useUser from "../hooks/useUser";

const Header = () => {
  const { logout, currentUser,loading } = useAuth();
  const navigate = useNavigate();
  const {user} = useUser(currentUser.uid)
  const signout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Flex
      maxW={"100%"}
      px={[3,10]}
      py={2}
      borderBottom={"1px solid"}
      borderColor={"blue.100"}
      mx={"auto"}
      justifyContent={"space-between"}
      alignItems={"center"}
      position={"sticky"}
      h={"max-content"}
      top={0}
      bgColor={"white"}
      zIndex={2}
    >
      <Text fontSize={['xl','2xl']} as={Link} to={"/"}>
        Student Hub
      </Text>
      <HStack>
        <Button fontSize={12} isLoading={loading}  display={['flex','none']} size={"sm"} gap={2} colorScheme="blue" p={3} as={Link} to={`/users/${currentUser.uid}`}>
          <FaUser/>
          {user?.username}
        </Button>
        <Button size={"sm"} colorScheme="blue" p={3} onClick={signout}>
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};

export default Header;
