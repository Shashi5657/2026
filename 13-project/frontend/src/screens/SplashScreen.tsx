import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import skillsForgeLogo from "../assets/images/skillforge_logo.png";

const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View>
      <Image source={skillsForgeLogo} />
      <Text>SkillForge</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
