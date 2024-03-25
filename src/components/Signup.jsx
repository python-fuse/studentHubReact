import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Box,
  Heading,
  useColorModeValue,
  Text,
  useToast,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { comparePasswords } from "../utils/comparePassword";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Signup = () => {
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, signup } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comparePasswords(password, confirmPassword)) {
      try {
        setLoading(true);
        const res = await signup(email, password);
        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username,
          avatar: "",
          date: Date.now(),
        });

        toast({
          title: "Account created.",
          status: "success",
          isClosable: true,
          duration: 1000,
        });
        navigate("/");
      } catch (e) {
        setError("Enter a valid email or password");
        toast({
          description: "Password must be up to 6 digits.",
          status: "warning",
          duration: 1000,
        });
      }
    } else {
      setError("Passwords do not match!");
    }
  };
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
          Sign up
        </Heading>
        {error && (
          <Alert rounded={4} status="error" mb={2}>
            <AlertIcon />
            <AlertDescription fontSize={13}>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            mb="4"
          />
          <Input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            mb="4"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            mb="4"
          />
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            mb="4"
          />
          <Button
            className={loading ? "cursor-not-allowed animate-bounce" : ""}
            isLoading={loading}
            loadingText={'Signing up'}
            colorScheme="primary"
            type="submit"
            w="100%"
          >
            Signup
          </Button>
        </form>
        <Text fontSize="sm" className="text-center mt-2">
          Already have an account?{" "}
          <Link
            to={"/"}
            className="text-primary-500 font-bold border-primary-500 hover:border-b-2 "
          >
            Log in
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Signup;
