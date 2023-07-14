import React, { useRef } from "react";
import { View, Text, Animated, StyleSheet, Button } from "react-native";

export default function FadeAnimation() {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const resetAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={{ color: "red", marginBottom: 10 }}>Fade Animation</Text>
      </Animated.View>
      <Button title="Start Animation" onPress={startAnimation} />
      <View style={{ height: 10 }} />
      <Button title="Reset Animation" onPress={resetAnimation} />
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
