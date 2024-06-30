import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image, VStack, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { IData } from "../../../types";

type Props = {
  item: IData;
};

const { width, height } = Dimensions.get("screen");
const cardWidth = width / 2 - 24;

const CardItem = ({ item }: Props) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate("Detail")}
    >
      <VStack gap={"$3"} width={cardWidth}>
        <Image
          source={item.image}
          rounded={"$xl"}
          alt="image"
          width={cardWidth}
          height={cardWidth}
        />
        <Text fontSize={"$md"} fontWeight="$semibold" ellipsizeMode="tail" numberOfLines={2}>
          {item.title}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={2} color={"$coolGray500"}>
          {item.description}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
};

export default CardItem;

const styles = StyleSheet.create({});
