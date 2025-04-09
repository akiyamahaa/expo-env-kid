import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Box,
  VStack,
  Text,
  HStack,
  Image,
  ImageBackground,
  SafeAreaView,
} from "@gluestack-ui/themed";
import { ArrowLeft2 } from "iconsax-react-native";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { allData } from "../../db/slide-data";
import { IData } from "../../types";

type Props = {} & NativeStackScreenProps<RootStackParams, "Detail">;

const Detail = ({ navigation, route }: Props) => {
  const { id, type } = route.params;
  const data: any = allData[type][id];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!data) return null;

  return (
    <Box flex={1} bg="#F8FAFC">
      <StatusBar style="light" />
      {/* Hero Image */}
      <Box style={styles.heroContainer}>
        <ImageBackground source={data.image} style={styles.heroImage}>
          <Box style={styles.overlay} />
          <SafeAreaView>
            <HStack px={20} pt={20}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft2 size={28} color="#fff" />
              </TouchableOpacity>
            </HStack>
            <VStack px={20} mt={40} mb={20}>
              <Text fontSize="$2xl" fontWeight="bold" color="$white">
                {data.title}
              </Text>
              <Text color="$coolGray100" fontSize="$sm" mt="$1">
                Tài liệu học tập trực quan
              </Text>
            </VStack>
          </SafeAreaView>
        </ImageBackground>
      </Box>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            padding: 20,
          }}
        >
          <Text fontSize="$md" color="$coolGray700" lineHeight={24} mb="$4">
            {data.description}
          </Text>

          {/* Các phần nội dung */}
          {data.content.map((section: any, idx: number) => (
            <VStack gap="$2" key={`${section.title}-${idx}`} mb="$6">
              <Text
                fontSize="$lg"
                fontWeight="bold"
                color="$primary600"
                mb="$2"
              >
                {section.title}
              </Text>

              {/* Ảnh minh họa nếu có */}
              {section.image && (
                <Image
                  source={section.image}
                  w="$full"
                  h={200}
                  borderRadius={12}
                  resizeMode="cover"
                  mb="$3"
                  alt="section-img"
                />
              )}

              {/* Nội dung từng đoạn */}
              <VStack gap="$2">
                {section.body.map((para: any, i: number) => (
                  <Text
                    key={i}
                    fontSize="$md"
                    color="$coolGray800"
                    lineHeight={24}
                  >
                    {para}
                  </Text>
                ))}
              </VStack>
            </VStack>
          ))}
        </Animated.View>
      </ScrollView>
    </Box>
  );
};

export default Detail;

// -------------------------- Style --------------------------
const styles = StyleSheet.create({
  heroContainer: {
    height: 250,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
  },
  heroImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.35)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
