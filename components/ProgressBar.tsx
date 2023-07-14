import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";

export default function ProgressBar() {
  const progress = useRef(new Animated.Value(0)).current;

  const progressAnimated = progress.interpolate({
    inputRange: [0, 10],
    outputRange: ["0%", "100%"],
  });

  const startProgressAnimated = () => {
    Animated.timing(progress, {
      toValue: 10,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 24 }}>
        <Animated.View
          style={{
            backgroundColor: "#1D5D9B",
            height: 50,
            width: progressAnimated,
            zIndex: 1,
            borderRadius: 10,
          }}
        />
        <TouchableOpacity
          onPress={startProgressAnimated}
          style={{
            backgroundColor: "#75C2F6",
            height: 50,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            position: "absolute",
            top: 0,
          }}
          activeOpacity={1}
        />
        <Text
          style={{
            position: "absolute",
            zIndex: 2,
            alignSelf: "center",
            top: 15,
            fontSize: 14,
            color: "#000",
            fontWeight: "bold",
          }}
        >
          Start Progress
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
  },
});
