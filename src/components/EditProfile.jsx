import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useUpdateProfile from "../hooks/useUpdateProfile";

const EditProfile = ({ isOpen, onClose, user }) => {
  const { setFile,updateAvatar,loading } = useUpdateProfile(user?.id);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
    
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit profile</ModalHeader>
        <ModalCloseButton avatar />
        <ModalBody>
          <HStack spacing={5}>
            <Avatar name={user?.username} src={user?.avatar} size={"lg"} />
            <FormControl py={4}>
              <FormLabel htmlFor="picture">Change picture</FormLabel>
              <input type="file" accept="image/*" onChange={handleUpload} />
            </FormControl>
          </HStack>
          <Button onClick={updateAvatar} loadingText="Uploading" isLoading={loading} w="full" my={6} colorScheme="blue">
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;
