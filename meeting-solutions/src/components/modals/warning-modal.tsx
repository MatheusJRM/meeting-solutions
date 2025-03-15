import React from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { WarningModalProps } from "types/warning-modal-types";

export const WarningModal = ({
  visible,
  onClose,
  title,
  content,
  buttonTextCancel,
  buttonTextConfirm,
  handleActionConfirm,
  handleActionCancel,
}: WarningModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
          <View style={styles.buttonsView}>
            <Pressable
              onPress={handleActionCancel}
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: "#f06c6c" },
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>{buttonTextCancel}</Text>
            </Pressable>
            <Pressable
              onPress={handleActionConfirm}
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: "#6c7ff0" },
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>{buttonTextConfirm}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonsView: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: "#beb5b5",
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
