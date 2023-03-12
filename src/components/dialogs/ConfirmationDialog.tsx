import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>{title}</ModalHeader>

        <ModalBody>{message}</ModalBody>

        <ModalFooter>
          <Button onClick={onConfirm} mr={2} colorScheme="blue">
            Yes
          </Button>

          <Button onClick={onClose} colorScheme="red">
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
