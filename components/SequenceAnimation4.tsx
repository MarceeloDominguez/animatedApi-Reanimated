import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";

export default function SequenceAnimation4() {
  const translateYValues = useRef([
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
  ]).current;
  const opacityValues = useRef([
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
  ]).current;

  const startSequenceAnimation = () => {
    translateYValues[0].value = withSpring(-100, {
      damping: 10,
      stiffness: 100,
    });
    opacityValues[0].value = withTiming(1, { duration: 500 });

    translateYValues[1].value = withSpring(-200, {
      damping: 10,
      stiffness: 100,
    });
    opacityValues[1].value = withTiming(1, { duration: 500 });

    translateYValues[2].value = withSpring(-300, {
      damping: 10,
      stiffness: 100,
    });
    opacityValues[2].value = withTiming(1, { duration: 500 });
  };

  const animatedStyles = translateYValues.map((translateY, index) =>
    useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
      opacity: opacityValues[index].value,
      backgroundColor: index === 0 ? "red" : index === 1 ? "blue" : "green",
      marginTop: 20,
      width: 100,
      height: 100,
    }))
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={startSequenceAnimation}
        style={{ padding: 10, backgroundColor: "blue" }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Iniciar animación</Text>
      </TouchableOpacity>
      {animatedStyles.map((style, index) => (
        <Animated.View key={index} style={style} />
      ))}
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
