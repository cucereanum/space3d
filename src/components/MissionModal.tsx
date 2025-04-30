import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import Robot from "../../assets/robot.png"; // Example image, replace with your own

interface MissionModalProps {
  visible: boolean;
  onClose: () => void;
  onStart: () => void;
}

export default function MissionModal({
  visible,
  onClose,
  onStart,
}: MissionModalProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          {/* Space Illustration */}
          <Image source={Robot} style={styles.image} resizeMode="cover" />

          {/* Mission Title */}
          <Text style={styles.title}>Mission 1: Discover AI</Text>

          {/* Mission Description */}
          <Text style={styles.description}>
            Embark on your first mission to understand what Artificial
            Intelligence is and why it matters in our world.
          </Text>

          {/* Start Button */}
          <TouchableOpacity style={styles.startButton} onPress={onStart}>
            <Text style={styles.startButtonText}>Start Mission 🚀</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "rgba(20, 20, 50, 0.9)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
