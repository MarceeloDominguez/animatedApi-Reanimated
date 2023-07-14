import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";

export default function SequenceAnimation3() {
  const translateYValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const opacityValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const startSequenceAnimation = () => {
    Animated.sequence([
      //   Animated.timing(translateYValues[0], {
      //     toValue: -100,
      //     duration: 500,
      //     useNativeDriver: true,
      //   }),
      //   Animated.timing(opacityValues[0], {
      //     toValue: 1,
      //     duration: 500,
      //     useNativeDriver: true,
      //   }),
      //   Animated.timing(translateYValues[1], {
      //     toValue: -100,
      //     duration: 500,
      //     useNativeDriver: true,
      //   }),
      //   Animated.timing(opacityValues[1], {
      //     toValue: 1,
      //     duration: 500,
      //     useNativeDriver: true,
      //   }),
      //   Animated.timing(translateYValues[2], {
      //     toValue: -100,
      //     duration: 500,
      //     useNativeDriver: true,
      //   }),
      //   Animated.timing(opacityValues[2], {
      //     toValue: 1,
      //     duration: 500,
      //     useNativeDriver: true,
      //   }),
      Animated.timing(translateYValues[0], {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValues[0], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYValues[1], {
        toValue: -200,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValues[1], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYValues[2], {
        toValue: -300,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValues[2], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatedStyles = [
    {
      transform: [{ translateY: translateYValues[0] }],
      opacity: opacityValues[0],
      backgroundColor: "red",
    },
    {
      transform: [{ translateY: translateYValues[1] }],
      opacity: opacityValues[1],
      backgroundColor: "blue",
    },
    {
      transform: [{ translateY: translateYValues[2] }],
      opacity: opacityValues[2],
      backgroundColor: "green",
    },
  ];

  const opacityInterpolations = translateYValues.map((value, index) =>
    value.interpolate({
      inputRange: [-(index + 1) * 100, -index * 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    })
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
        <Animated.View
          key={index}
          style={[
            {
              marginTop: 20,
              width: 100,
              height: 100,
              //opacity: opacityInterpolations[index],
              opacity: Animated.multiply(
                opacityInterpolations[index],
                opacityValues[index]
              ),
            },
            style,
          ]}
        />
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
