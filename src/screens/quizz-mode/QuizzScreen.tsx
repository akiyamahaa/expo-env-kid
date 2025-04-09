import { Animated, Dimensions } from "react-native";
import {
  Button,
  Text,
  Image,
  Box,
  VStack,
  ScrollView,
  HStack,
  Progress,
} from "@gluestack-ui/themed";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { quizzData } from "../../db/quizz";
import TextBox, { EStatus } from "../../components/common/TextBox";
import { getRandomArray } from "../../utils/function";

const show: { [key: string]: string } = {
  easy: "Dễ",
  medium: "Trung bình",
  hard: "Khó",
};

const QuizzScreen = () => {
  const [status, setStatus] = useState<EStatus[]>([
    EStatus.NORMAL,
    EStatus.NORMAL,
    EStatus.NORMAL,
  ]);
  const [next, setNext] = useState(false);
  const [point, setPoint] = useState(0);

  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const [currQues, setCurrQues] = useState(0);
  const level: string = route.params.level ? route.params.level : "easy";
  const [quizzes] = useState(getRandomArray(quizzData[level], 6));

  const onPress = (i: number) => () => {
    const { ans } = quizzes[currQues];
    const newStatus = [...status].map(() => EStatus.DISABLE);
    if (i === ans) {
      newStatus[i] = EStatus.CORRECT;
      setPoint(point + 1);
    } else {
      newStatus[ans] = EStatus.CORRECT;
      newStatus[i] = EStatus.IN_CORRECT;
    }
    setStatus(newStatus);
    setNext(true);
  };

  const onNext = () => {
    if (currQues < quizzes.length - 1) {
      setCurrQues(currQues + 1);
      setNext(false);
      setStatus([EStatus.NORMAL, EStatus.NORMAL, EStatus.NORMAL]);
    } else {
      navigation.navigate("QuizzResult", {
        level,
        point,
        length: quizzes.length,
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Mức độ ${show[level]}`,
    });
  }, []);

  const screenWidth = Dimensions.get("screen").width;

  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: ((currQues + 1) / quizzes.length) * 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currQues]);

  return (
    <ScrollView flex={1} bg="#EAF6EF" px="$4" py="$4">
      {/* Tiến trình câu hỏi */}
      <HStack
        alignItems="center"
        justifyContent="space-between"
        mb="$2"
        px="$2"
      >
        <Text fontSize="$sm" color="$textDark500">
          Câu {currQues + 1}/{quizzes.length}
        </Text>
        <Text fontSize="$sm" color="$emerald700" fontWeight="bold">
          Điểm: {point}
        </Text>
      </HStack>
      {/* Progress bar với animation */}
      <Box height={8} bg="#D1FAE5" borderRadius={8} overflow="hidden" mb="$4">
        <Animated.View
          style={{
            height: 8,
            backgroundColor: "#10B981",
            width: progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
            borderRadius: 8,
          }}
        />
      </Box>

      {/* Ảnh minh họa */}
      <Box borderRadius={16} overflow="hidden" mb="$4" bg="$white">
        <Image
          alt="quiz-img"
          w="$full"
          h={Math.round((159 / 290) * screenWidth)}
          source={quizzes[currQues].image}
        />
      </Box>

      {/* Câu hỏi */}
      <Box bg="$white" borderRadius={20} px="$4" py="$4" mb="$4">
        <Text
          fontSize="$lg"
          fontWeight="700"
          color="$textDark800"
          textAlign="center"
        >
          {quizzes[currQues].ques}
        </Text>
      </Box>

      {/* Đáp án */}
      <VStack gap="$3" mb="$8">
        {quizzes[currQues].choose.map((item: string, i: number) => (
          <TextBox
            key={`${item}-${i}`}
            status={status[i]}
            onPress={onPress(i)}
            content={item}
            next={next}
          />
        ))}
      </VStack>

      {/* Nút tiếp tục */}
      <Box px="$2">
        <Button
          disabled={!next}
          onPress={onNext}
          bg="#2E8B57"
          py="$3"
          rounded="$2xl"
          opacity={!next ? 0.5 : 1}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text color="$white" fontSize="$md" fontWeight="600">
            {next && currQues === quizzes.length - 1
              ? "Hoàn thành"
              : "Tiếp tục"}
          </Text>
        </Button>
      </Box>
    </ScrollView>
  );
};

export default QuizzScreen;
