import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function FadeAnimation2() {
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  //   const startAnimation = () => {
  //     opacity.value = withTiming(0, { duration: 1000 });
  //   };

  //   const resetAnimation = () => {
  //     opacity.value = withTiming(1, { duration: 1000 });
  //   };

  const startAnimation = () => {
    opacity.value = withTiming(opacity.value === 1 ? 0 : 1, { duration: 1000 });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle]}>
        <Text style={{ color: "red", marginBottom: 10 }}>
          Fade Animation con Reanimated
        </Text>
      </Animated.View>
      <Button title="Start Animation" onPress={startAnimation} />
      {/* <View style={{ height: 10 }} />
      <Button title="Reset Animation" onPress={resetAnimation} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
});
