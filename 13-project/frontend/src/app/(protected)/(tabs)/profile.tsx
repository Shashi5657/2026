import { View, Text } from "react-native";

import { useAuth } from "@/context/AuthContext";

import { spacing } from "@/theme/spacing";
import PrimaryButton from "@/components/PrimaryButton";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        padding: spacing.lg,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        Profile
      </Text>

      <View
        style={{
          marginTop: spacing.xl,
          gap: spacing.md,
        }}
      >
        <Text>Name: {user?.name}</Text>

        <Text>Email: {user?.email}</Text>

        <Text>Role: {user?.role}</Text>
      </View>

      <View
        style={{
          marginTop: spacing.xxl,
        }}
      >
        <PrimaryButton title="Logout" variant="secondary" onPress={logout} />
      </View>
    </View>
  );
}
