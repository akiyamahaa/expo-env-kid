import React from "react";
import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Box, VStack, Text, Image } from "@gluestack-ui/themed";
import { IActivity } from "../../db/slide-data";

type PracticeCardProps = {
  item: IActivity;
  index: number;
  onPress: () => void;
};

const PracticeCard = ({ item, index, onPress }: PracticeCardProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.97, { damping: 10 });
  };

  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 10 });
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <Animated.View style={[animatedStyle]}>
        <Box
          bg="$white"
          borderRadius={20}
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.12}
          shadowRadius={6}
          elevation={4}
          overflow="hidden"
        >
          <Image
            source={require("../../assets/env/story1.png")}
            alt="activity-image"
            w="100%"
            h={160}
            resizeMode="cover"
          />

          <VStack p="$3">
            <Text fontSize="$lg" fontWeight="$bold" color="$emerald700" mb="$1">
              📘 Bài {index}: {item.title}
            </Text>
            <Text fontSize="$sm" color="$coolGray600">
              🎯 {item.target}
            </Text>
          </VStack>
        </Box>
      </Animated.View>
    </Pressable>
  );
};

export default PracticeCard;
