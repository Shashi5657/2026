import { View, Text, SafeAreaViewBase } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Property = () => {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Text>Property {id}</Text>
    </SafeAreaView>
  );
};

export default Property;
