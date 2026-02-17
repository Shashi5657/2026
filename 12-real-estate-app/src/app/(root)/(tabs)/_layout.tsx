import { Tabs } from "expo-router";
import { SPACING } from "@/themes/spacing";
import { TYPOGRAPHY } from "@/themes/typography";
import { COLORS } from "@/themes/colors";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: TYPOGRAPHY.small,
          fontWeight: "600",
          marginBottom: SPACING.xs,
        },

        tabBarStyle: {
          position: "absolute",

          height: 72,
          paddingTop: SPACING.sm,
          paddingBottom: SPACING.md,

          backgroundColor: COLORS.surface,

          borderTopWidth: 1,
          borderTopColor: COLORS.border,

          elevation: 0,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
