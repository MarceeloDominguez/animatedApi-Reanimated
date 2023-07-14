import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";

export default function SequenceAnimation2() {
  const shapeValue = useRef(new Animated.Value(0)).current;

  const startSequenceAnimation = () => {
    Animated.sequence([
      Animated.timing(shapeValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(shapeValue, {
        toValue: 2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(shapeValue, {
        toValue: 3,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatedStyle = {
    opacity: shapeValue.interpolate({
      inputRange: [0, 1, 2, 3],
      outputRange: [0, 1, 1, 1],
    }),
    transform: [
      {
        scale: shapeValue.interpolate({
          inputRange: [0, 1, 2, 3],
          outputRange: [0, 1, 1.5, 1],
        }),
      },
      {
        rotate: shapeValue.interpolate({
          inputRange: [0, 1, 2, 3],
          outputRange: ["0deg", "0deg", "180deg", "0deg"],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={startSequenceAnimation}
        style={{ padding: 10, backgroundColor: "blue" }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Iniciar animación</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          { marginTop: 20, width: 100, height: 100, backgroundColor: "red" },
          animatedStyle,
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
});
