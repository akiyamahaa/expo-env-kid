import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ViewToken,
} from "react-native";
import React from "react";
import { HStack, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { homeData, OnboardingData } from "../../db/animated-slide";
import AnimatedCard from "./component/AnimatedCard";

type Props = {};

const Home = (props: Props) => {
  const x = useSharedValue(0);
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <ScrollView flex={1} bg="$white" showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ paddingTop: StatusBar.currentHeight }} />
      <VStack flex={1} p={"$4"} gap={"$4"} bg="$white">
        <HStack justifyContent="space-between" mb={"$4"}>
          <Text fontWeight="$semibold" fontSize={"$3xl"} color="$primary600">
            EcoKids
          </Text>
        </HStack>
      </VStack>

      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={homeData}
        renderItem={({ item, index }) => {
          return (
            <AnimatedCard
              item={item}
              index={index}
              x={x}
              flatListIndex={flatListIndex}
              flatListRef={flatListRef}
            />
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
