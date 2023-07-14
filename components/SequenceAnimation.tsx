import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";

export default function SequenceAnimation() {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const startSequenceAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
    opacity: opacityValue,
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
