import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  View,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import {
  Button,
  ButtonText,
  ImageBackground,
  Text,
  VStack,
  HStack,
} from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";

type Props = NativeStackScreenProps<RootStackParams, "SplashScreen">;

const { width } = Dimensions.get("screen");

const messages = [
  {
    image: require("../../assets/env/splash-bg1.png"),
    text: "🌍 Chào mừng đến với hành trình xanh",
  },
  {
    image: require("../../assets/env/splash-bg2.png"),
    text: "🌱 Cùng nhau học & bảo vệ môi trường",
  },
  {
    image: require("../../assets/env/splash-bg3.png"),
    text: "🚀 Bắt đầu trải nghiệm ngay!",
  },
];

const SplashScreen = ({ navigation }: Props) => {
  const [page, setPage] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateIn = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(30);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onSkip = () => {
    navigation.replace("TabNavigation");
  };

  const onNext = () => {
    if (page < messages.length - 1) {
      setPage((prev) => prev + 1);
    } else {
      navigation.replace("TabNavigation");
    }
  };

  useEffect(() => {
    animateIn();
  }, [page]);

  const current = messages[page];

  return (
    <ImageBackground
      source={current.image}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar style="light" />

      <Animated.View
        style={[
          styles.overlayContent,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <VStack px="$6" py="$10" flex={1} justifyContent="flex-end" space="lg">
          <Text
            fontSize="$2xl"
            color="$white"
            fontWeight="$bold"
            textAlign="center"
          >
            {current.text}
          </Text>

          <HStack justifyContent="center" space="md">
            {messages.map((_, index) => (
              <Text
                key={index}
                style={[styles.dot, page === index && styles.activeDot]}
              >
                •
              </Text>
            ))}
          </HStack>

          <HStack justifyContent="space-between" alignItems="center">
            <Pressable onPress={onSkip}>
              <Text color="$coolGray100" fontSize="$sm">
                Bỏ qua
              </Text>
            </Pressable>

            <Button onPress={onNext} size="md">
              <ButtonText>
                {page === messages.length - 1 ? "Bắt đầu" : "Tiếp"}
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Animated.View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    justifyContent: "flex-end",
  },
  overlayContent: {
    flex: 1,
  },
  dot: {
    fontSize: 24,
    color: "#ccc",
  },
  activeDot: {
    color: "#fff",
  },
});
