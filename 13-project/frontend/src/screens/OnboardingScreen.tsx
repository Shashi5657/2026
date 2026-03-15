import { View, FlatList } from "react-native";

import { useState, useRef } from "react";

import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingItem from "../components/OnboardingItem";
import PaginationDots from "../components/PaginationDots";
import PrimaryButton from "../components/PrimaryButton";

import { onboardingData } from "../data/onboardingData";
import { colors, spacing } from "@/theme";

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef<FlatList<any>>(null);

  const handleNext = async () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      await AsyncStorage.setItem("onboardingCompleted", "true");

      router.replace("/welcome");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width,
          );

          setCurrentIndex(index);
        }}
      />

      <View
        style={{
          padding: spacing.lg,
          gap: spacing.lg,
        }}
      >
        <PaginationDots
          currentIndex={currentIndex}
          total={onboardingData.length}
        />

        <PrimaryButton
          title={
            currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"
          }
          onPress={handleNext}
        />
      </View>
    </View>
  );
}
