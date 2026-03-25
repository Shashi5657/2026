import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import ScreenContainer from "@/components/common/ScreenContainer";
import GreetingCard from "@/components/dashboard/GreetingCard";
import StatCard from "@/components/dashboard/StatCard";
import SectionHeader from "@/components/dashboard/SectionHeader";
import QuickActionCards from "@/components/dashboard/QuickActionCard";
import { commonStyles, spacing } from "@/theme";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ScreenContainer>
      <GreetingCard name={user?.name} />
      <View
        style={[commonStyles.row, { gap: spacing.md, marginTop: spacing.lg }]}
      >
        <StatCard title="Courses" value={0} />
        <StatCard title="Tasks" value={0} />
        <StatCard title="Streak" value={0} />
      </View>
      <View style={{ marginTop: spacing.xl }}>
        <SectionHeader title="Quick Action" />
      </View>

      <View
        style={[commonStyles.row, { gap: spacing.md, marginTop: spacing.md }]}
      >
        <QuickActionCards title="Learn" emoji="📚" />

        <QuickActionCards title="Tasks" emoji="✅" />
      </View>
    </ScreenContainer>
  );
}
