import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import {
  Button,
  ButtonText,
  ImageBackground,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";

type Props = {} & NativeStackScreenProps<RootStackParams, "SplashScreen">;

const SplashScreen = (props: Props) => {
  const { navigation } = props;

  const onNext = () => {
    navigation.navigate("TabNavigation");
  }; // arrow function

  return (
    <ImageBackground
      flex={1}
      resizeMode="contain"
      py={32}
      justifyContent="flex-end"
      source={require("../../assets/env/splash-bg1.png")}
    >
      <StatusBar style="light" />
      <VStack px="$6">
        <Button onPress={onNext}>
          <ButtonText>Bắt đầu</ButtonText>
        </Button>
      </VStack>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
