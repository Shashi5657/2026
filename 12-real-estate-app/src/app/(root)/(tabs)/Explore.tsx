import { View, Text } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "./_layout";

const Explore = () => {
  const { userName } = useContext(UserContext);
  return (
    <View>
      <Text>Explore {userName}</Text>
    </View>
  );
};

export default Explore;
