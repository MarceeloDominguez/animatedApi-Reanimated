import React, {
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

type BottomSheetProps = {
  //children?: React.ReactNode;
};

type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
  children?: React.ReactNode;
};

export default function BottomSheet() {
  const ref = useRef<BottomSheetRefProps>(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();

    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }

    // ref?.current?.scrollTo(-200);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPress} />
        <Boton ref={ref}>
          <View style={{ flex: 1, backgroundColor: "violet" }} />
        </Boton>
      </View>
    </GestureHandlerRootView>
  );
}

const Boton = React.forwardRef<BottomSheetProps, BottomSheetRefProps>(
  ({ children }, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
      "worklet";

      //   if (destination === 0) {
      //     active.value = false
      //   } else {
      //     active.value = true
      //   }

      active.value = destination !== 0;

      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive, children }), [
      scrollTo,
      isActive,
    ]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        //console.log(event.translationY);
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          //translateY.value = withSpring(0, { stiffness: 50 });
          scrollTo(0);
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          //translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 });
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    // useEffect(() => {
    //   //translateY.value = withTiming(-SCREEN_HEIGHT / 3);
    //   //translateY.value = withSpring(-SCREEN_HEIGHT / 3, { damping: 50 });
    //   scrollTo(-SCREEN_HEIGHT / 3);
    // }, []);

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP
      );

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.buttomSheetContainer, rBottomSheetStyle]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 50,
    backgroundColor: "#fff",
    aspectRatio: 1,
    borderRadius: 25,
    opacity: 0.6,
  },
  //styles buttom
  buttomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "#fff",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "red",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});
