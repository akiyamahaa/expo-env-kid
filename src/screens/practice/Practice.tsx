import React from "react";
import { StatusBar, Platform } from "react-native";
import { ScrollView, VStack, Text, Box, HStack } from "@gluestack-ui/themed";
import { activity } from "../../db/slide-data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams, BottomTabsParams } from "../../navigations/config";
import PracticeCard from "./PracticeCard";

type Props = NativeStackScreenProps<
  RootStackParams & BottomTabsParams,
  "Practice"
>;

const activityList = Object.values(activity);

const Practice = ({ navigation }: Props) => {
  const onPracticeDetail = (id: any) => {
    navigation.navigate("DetailActivity", { id });
  };

  return (
    <VStack flex={1} bg="$mint50" px="$4" pt="$6">
      {Platform.OS === "android" && <StatusBar barStyle="dark-content" />}

      <Text fontSize="$2xl" fontWeight="$bold" color="$emerald800" mb="$2">
        🌱 Hành trình xanh
      </Text>
      <Text fontSize="$md" color="$coolGray600" mb="$4">
        Học vui - Bảo vệ môi trường!
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack gap="$4">
          {activityList.map((item, index) => (
            <PracticeCard
              key={item.id}
              item={item}
              index={index + 1}
              onPress={() => onPracticeDetail(item.id)}
            />
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Practice;
