import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Box,
  Heading,
  useColorModeValue,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Image,
  Flex,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import google from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";

const Login = () => {
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const { currentUser, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/feed");
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      setError("Email or Password can't be empty");
    } else {
      setError("");
      try {
        setLoading(true);
        await login(email, password);
        toast({
          status: "success",
          description: "Email Login Succesful!",
          duration: "2000",
          isClosable: true,
        });

        navigate("/feed");
      } catch (e) {
        switch (e.code) {
          case "auth/user-not-found":
            setError("User not found. Please sign up to create an account.");
            setLoading(false);
            break;

          case "auth/invalid-credential":
            setError("Enter a valid email or password");
            setLoading(false);
            break;

          default:
            setError("An error occurred. Please try again later.");
            setLoading(false);
            console.log(e.code);
        }
      }
    }
  };

  // const doSignwithGoogle = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   loginWithGoogle()
  //     .then((res) => {
  //       if (currentUser) {
  //         navigate("/feed");
  //       }
  //       toast({
  //         status: "success",
  //         description: "Google Login Succesful!",
  //         duration: "2000",
  //         isClosable: true,
  //       });
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       toast({
  //         status: "error",
  //         description: "Google Authorization Revoked!",
  //         duration: 2000,
  //         isClosable: true,
  //       });
  //     });
  // };

  return (
    <Box
      w="100%"
      h="100dvh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={bgColor}
    >
      <Box
        maxW={['xs','md']}
        w="100%"
        p="8"
        borderWidth="1px"
        borderRadius="lg"
        borderColor={borderColor}
        bg="white"
        boxShadow="lg"
      >
        <Heading mb="4" textAlign="center" color="primary.500">
          Student Hub
        </Heading>
        <Heading fontSize={26} mb="4" textAlign="center" color="gray.800">
          Log in
        </Heading>
        {error && (
          <Alert rounded={4} status="error" mb={2}>
            <AlertIcon />
            <AlertDescription fontSize={13}>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            mb="4"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            mb="4"
          />
          <Button
            className={loading ? "cursor-not-allowed animate-bounce" : ""}
            loadingText={'Logging in'}
            isLoading={loading}
            colorScheme="blue"
            type="submit"
            w="100%"
          >
            Login
          </Button>
        </form>
        {/* <Text textAlign={"center"} my={2}>
          Or
        </Text>
        <Button
          onClick={doSignwithGoogle}
          maxW="md"
          w="100%"
          p="4"
          mt={2}
          borderWidth="1px"
          borderRadius="lg"
          borderColor={borderColor}
          shadow={"md"}
          bg="white"
        >
          <Flex alignItems={"center"} gap={3} justifyContent={"center"}>
            <Image src={google} boxSize={30} />
            <Text fontSize={20}>Continue with Google</Text>
          </Flex>
        </Button> */}
        <Text fontSize="sm" className="text-center mt-2">
          Don't have an account?{" "}
          <Text
            as={Link}
            to={"/signup"}
            className="text-primary-500 font-bold border-primary-500 "
            colorScheme="blue"
          >
            Sign up
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
