import { Platform, StatusBar, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { Box, Image, Text, VStack, HStack, Center } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";

enum EResultType {
  GOOD,
  BAD,
}

const RETURN_RESULT = {
  [EResultType.GOOD]: {
    title: "🎉 Làm tốt lắm!",
    description: "Bạn hiểu rõ chủ đề này rồi!",
    color: "#10B981", // xanh ngọc
    bgColor: "#ECFDF5",
    logo: require("../../assets/good_logo.png"),
  },
  [EResultType.BAD]: {
    title: "😕 Ôi không!",
    description: "Cần cố gắng hơn ở lần tới nhé!",
    color: "#F97316", // cam
    bgColor: "#FFF7ED",
    logo: require("../../assets/bad_logo.png"),
  },
};

const QuizzResult = () => {
  const route = useRoute<any>();
  const { point, length } = route.params;
  const navigation = useNavigation<any>();

  const result = point > length / 2 ? EResultType.GOOD : EResultType.BAD;
  const numWrong = length - point;

  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (point / length) * 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <VStack
      flex={1}
      bg={RETURN_RESULT[result].bgColor}
      justifyContent="space-between"
      alignItems="center"
      px="$6"
      py="$8"
    >
      {Platform.OS === "android" && <StatusBar barStyle="dark-content" />}

      {/* Header logo */}
      <Image
        source={RETURN_RESULT[result].logo}
        alt="result"
        w={180}
        h={180}
        resizeMode="contain"
      />

      {/* Nội dung kết quả */}
      <VStack alignItems="center" space="md">
        <Text
          fontSize="$3xl"
          fontWeight="800"
          color={RETURN_RESULT[result].color}
        >
          {RETURN_RESULT[result].title}
        </Text>
        <Text fontSize="$md" color="$textDark700" textAlign="center">
          {RETURN_RESULT[result].description}
        </Text>

        {/* Vòng tròn điểm số (hiệu ứng hiện đại) */}
        <Animated.View
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            backgroundColor: "#ffffff",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
            marginTop: 20,
          }}
        >
          <Text fontSize="$lg" color="$coolGray500" mb="$1">
            Kết quả của bạn
          </Text>
          <Text
            fontSize="$5xl"
            fontWeight="900"
            color={RETURN_RESULT[result].color}
          >
            {point}/{length}
          </Text>
        </Animated.View>
      </VStack>

      {/* Thống kê phụ */}
      <HStack mt="$8" space="lg">
        <StatBox label="✅ Đúng" value={point} color="#22C55E" />
        <StatBox label="❌ Sai" value={numWrong} color="#EF4444" />
      </HStack>

      {/* Nút tiếp tục */}
      <TouchableOpacity onPress={() => navigation.navigate("Quizz")}>
        <Box bgColor="#3B82F6" py="$3.5" px="$10" rounded="$xl" mt="$10">
          <Text color="$white" fontWeight="700" fontSize="$md">
            🚀 Tiếp tục học
          </Text>
        </Box>
      </TouchableOpacity>
    </VStack>
  );
};

export default QuizzResult;

// Component nhỏ hiển thị thống kê
const StatBox = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => {
  return (
    <Center
      w={100}
      h={100}
      borderRadius={20}
      bg={color}
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="$2xl" fontWeight="bold" color="#fff">
        {value}
      </Text>
      <Text fontSize="$sm" color="#fff">
        {label}
      </Text>
    </Center>
  );
};
