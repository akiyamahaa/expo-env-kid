import React from "react";
import { ScrollView, StatusBar, Platform } from "react-native";
import { Box, HStack, VStack, Text } from "@gluestack-ui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomRootParams } from "../../navigations/config";
import { EDataType, story } from "../../db/slide-data";
import CardItem from "../home/component/CardItem";

type Props = {} & NativeStackScreenProps<BottomRootParams, "Activity">;

const Activity = ({}: Props) => {
  return (
    <VStack flex={1} bg="$mint50">
      {Platform.OS === "android" && <StatusBar barStyle="dark-content" />}

      {/* Tiêu đề truyền cảm hứng */}
      <VStack px="$4" pt="$6" mb="$2">
        <Text fontSize="$2xl" fontWeight="$bold" color="$emerald800" mb="$1">
          📚 Những câu chuyện kỳ diệu
        </Text>
        <Text fontSize="$md" color="$coolGray600">
          Khám phá – Học hỏi – Bảo vệ Trái Đất! 🌍
        </Text>
      </VStack>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
      >
        <HStack flexWrap="wrap" justifyContent="space-between">
          {Object.values(story).map((item, index) => (
            <Box key={item.id}>
              <CardItem item={item} type={EDataType.STORY} index={index} />
            </Box>
          ))}
        </HStack>
      </ScrollView>
    </VStack>
  );
};

export default Activity;
