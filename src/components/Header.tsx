import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MissionModal from "./MissionModal";

const Header = () => {
  const [missionVisible, setMissionVisible] = useState(false);

  return (
    <>
      <MissionModal
        visible={missionVisible}
        onClose={() => setMissionVisible(false)}
        onStart={() => {
          setMissionVisible(false);
          // Navigate to Mission Content screen
        }}
      />

      <BlurView intensity={60} tint="dark" style={styles.header}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          style={styles.avatar}
        />
        <View style={styles.centerContent}>
          <Text style={styles.username}>Space Explorer #123</Text>
          <Text style={styles.level}>Level 0 - 0 XP</Text>
        </View>
        <TouchableOpacity
          onPress={() => setMissionVisible(true)}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>Begin Mission 🚀</Text>
        </TouchableOpacity>
      </BlurView>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    marginRight: 12,
  },
  centerContent: {
    flex: 1,
  },
  username: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  level: {
    color: "#aaa",
    fontSize: 12,
  },
  ctaButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6D28D9",
  },
  ctaButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
