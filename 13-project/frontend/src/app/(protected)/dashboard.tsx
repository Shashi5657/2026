import { View, Text } from "react-native";

import { useAuth } from "@/context/AuthContext";
import PrimaryButton from "@/components/PrimaryButton";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        Hello {user?.name} 👋
      </Text>

      <Text
        style={{
          marginTop: 10,
        }}
      >
        Welcome to SkillForge
      </Text>

      <PrimaryButton title="Logout" onPress={logout} />
    </View>
  );
}
