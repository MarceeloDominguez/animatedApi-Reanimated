import React, { useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function Bounce() {
  const box1TranslateX = useSharedValue(0);
  const box2TranslateX = useSharedValue(0);
  const box3TranslateY = useSharedValue(0);
  const box4TranslateY = useSharedValue(0);

  const animatedBox1Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: box1TranslateX.value }],
    };
  });

  const animatedBox2Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: box2TranslateX.value }],
    };
  });

  const animatedBox3Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: box3TranslateY.value }],
    };
  });

  const animatedBox4Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: box4TranslateY.value }],
    };
  });

  const startAnimation = () => {
    box1TranslateX.value = withSpring(-150, { damping: 10, stiffness: 100 });
    box2TranslateX.value = withSpring(150, { damping: 10, stiffness: 100 });
    box3TranslateY.value = withSpring(-150, { damping: 10, stiffness: 100 });
    box4TranslateY.value = withSpring(150, { damping: 10, stiffness: 100 });
  };

  //   useEffect(() => {
  //     box1TranslateX.value = withSpring(-150, { damping: 10, stiffness: 100 });
  //     box2TranslateX.value = withSpring(150, { damping: 10, stiffness: 100 });
  //     box3TranslateY.value = withSpring(-150, { damping: 10, stiffness: 100 });
  //     box4TranslateY.value = withSpring(150, { damping: 10, stiffness: 100 });
  //   }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, { backgroundColor: "red" }, animatedBox1Style]}
      />
      <Animated.View
        style={[styles.box, { backgroundColor: "violet" }, animatedBox2Style]}
      />
      <Animated.View
        style={[styles.box, { backgroundColor: "blue" }, animatedBox3Style]}
      />
      <Animated.View
        style={[styles.box, { backgroundColor: "green" }, animatedBox4Style]}
      />
      <View style={{ height: 10 }} />
      <Button title="Start Animation" onPress={startAnimation} />
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
  box: {
    width: 100,
    height: 100,
  },
});
