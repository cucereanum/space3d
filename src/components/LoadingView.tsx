import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  cancelAnimation,
  runOnUI,
} from "react-native-reanimated";

import SolarSystem from "../../assets/solar-system.png";

interface LoadingViewProps {
  progress: number; // 0 to 100
}

const LoadingView: React.FC<LoadingViewProps> = ({ progress }) => {
  const progressValue = useSharedValue(0);
  const widthSize = Dimensions.get("window").width;
  const heightSize = Dimensions.get("window").height;

  useEffect(() => {
    runOnUI(() => {
      cancelAnimation(progressValue);
      console.log("progressValue", progressValue, progress);
      progressValue.value = withTiming(progress, { duration: 200 });
    })();
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value}%`,
  }));
  return (
    <View style={styles.overlay}>
      <Image
        source={SolarSystem}
        style={{
          width: widthSize,
          height: "100%",
          resizeMode: "contain",
        }}
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.label}>Preparing the Space...</Text>
        <View style={styles.barBackground}>
          <Text style={styles.text}>{Math.floor(progress)}%</Text>
          <Animated.View
            style={[styles.barForeground, animatedStyle]}
          ></Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    width: "100%",
    position: "absolute",
    bottom: 50,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000011",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    paddingHorizontal: 20,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    zIndex: 1,
    alignSelf: "center",
    marginTop: 12,
  },
  label: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    zIndex: 1,
  },
  barBackground: {
    width: "100%",
    height: 50,
    backgroundColor: "#090930",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 10,
  },
  barForeground: {
    height: "100%",
    backgroundColor: "#3232ad",
    borderRadius: 5,
    position: "absolute",
  },
});

export default LoadingView;
