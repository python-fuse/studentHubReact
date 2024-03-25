import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Header = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const signout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Flex
      maxW={"100%"}
      px={10}
      py={2}
      borderBottom={'1px solid'}
      borderColor={'blue.100'}
      mx={"auto"}
      justifyContent={"space-between"}
      alignItems={"center"}
      position={'sticky'}
      h={'max-content'}
      top={0}
      bgColor={'white'}
      zIndex={2}
    >
      <Text fontSize={32} as={Link} to={'/'}>Student Hub</Text>
      <Button size={'sm'} colorScheme="blue" p={3} onClick={signout}>
        Logout
      </Button>
    </Flex>
  );
};

export default Header;
