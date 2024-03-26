import { Avatar, Box, Button, Code, Stack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useAuth } from "../auth/AuthProvider";

const ActiveUser = () => {
  const { currentUser } = useAuth();
  const { user } = useUser(currentUser.uid);

  return (
    <Stack align={"center"} spacing={"2"} my={8}>
      <Avatar boxShadow={'lg'} colorScheme="blue" size={"2xl"} name={user?.username} src={user?.avatar} />
      <Code>@{user?.username}</Code>
      <Button colorScheme="blue" w={"full"} as={Link} to={`/users/${currentUser.uid}`}>
        Edit Profile
      </Button>
    </Stack>
  );
};

const Sidebar = () => {
  return (
    <Box
      p={6}
      w={"100%"}
      maxW={"300px"}
      borderLeft={"1px solid"}
      borderLeftColor={"blue.100"}
      position={"sticky"}
      top={16}  
      overflowY={"hidden"}
      align={"center"}
      height={"100dvh"}
      display={{ base: "none", md: "block" }}
    >
      <ActiveUser />
      <Box
        as={"ul"}
        borderTop={"2px solid"}
        borderColor={"blue.200"}
        align={"center"}
      >
        <Button
          variant={"outline"}
          colorScheme="blue"
          //   as={Link}
          //   to={""}
          mt={4}
          size={"sm"}
        >
          All Users
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
