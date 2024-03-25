import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <Header />
      <Flex pb={12} mx={"auto"} maxW={"1200px"}>
        <Box w={"900px"}>
          <Outlet />
        </Box>
        <Sidebar />
      </Flex>
    </>
  );
};

export default Layout;
