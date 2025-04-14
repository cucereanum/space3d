import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import {
  useSharedValue,
  withTiming,
  Easing,
  withRepeat,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const STAR_COUNT = 100;

// Pre-generate stars data - this doesn't use hooks so it's safe outside the component
const generateStarsData = () => {
  return Array.from({ length: STAR_COUNT }).map(() => ({
    x: Math.random() * width,
    yStart: Math.random() * height,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.5,
  }));
};

// Create the stars array once, outside of the component
const starsData = generateStarsData();

const SpaceScreen: React.FC = () => {
  // Create an array to hold all of our animated values
  const animatedYPositions = starsData.map((star) =>
    useSharedValue(star.yStart)
  );

  // Setup the animations on component mount
  useEffect(() => {
    starsData.forEach((star, index) => {
      const duration = (height - star.yStart) * (10 / star.speed);

      // Start the animation
      animatedYPositions[index].value = withRepeat(
        withTiming(height, {
          duration,
          easing: Easing.linear,
        }),
        -1, // Infinite repeats
        false // Don't reverse
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Group>
          {starsData.map((star, index) => (
            <Circle
              key={index}
              cx={star.x}
              // Use modulo to keep stars in view
              cy={animatedYPositions[index].value % height}
              r={star.size}
              color="white"
            />
          ))}
        </Group>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  canvas: {
    flex: 1,
  },
});

export default SpaceScreen;
