import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";

const home = () => {
  const { user } = useAuth();
  return (
    <View>
      <Text>Hello {user?.name}👋</Text>
      
    </View>
  );
};

export default home;
