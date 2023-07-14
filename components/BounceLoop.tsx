import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

export default function BounceLoop() {
  const box1TranslateX = useRef(new Animated.Value(0)).current;
  const box2TranslateX = useRef(new Animated.Value(0)).current;

  const animateBoxes = () => {
    Animated.sequence([
      Animated.spring(box1TranslateX, {
        toValue: -150,
        damping: 10,
        stiffness: 100,
        useNativeDriver: false,
      }),
      Animated.spring(box1TranslateX, {
        toValue: 0,
        damping: 10,
        stiffness: 100,
        useNativeDriver: false,
      }),
      Animated.spring(box2TranslateX, {
        toValue: 150,
        damping: 10,
        stiffness: 100,
        useNativeDriver: false,
      }),
      Animated.spring(box2TranslateX, {
        toValue: 0,
        damping: 10,
        stiffness: 100,
        useNativeDriver: false,
      }),
    ]).start(() => {
      requestAnimationFrame(animateBoxes);
    });
  };

  useEffect(() => {
    animateBoxes();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            backgroundColor: "red",
            transform: [{ translateX: box1TranslateX }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.box,
          {
            backgroundColor: "violet",
            transform: [{ translateX: box2TranslateX }],
          },
        ]}
      />
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
