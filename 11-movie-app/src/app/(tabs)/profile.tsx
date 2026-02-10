import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { commonStyles } from "../../../styles/commonStyles";
import { COLORS } from "../../../theme/colors";
import { SPACING } from "../../../theme/spacing";
import { TYPOGRAPHY } from "../../../theme/typography";
import { RADIUS } from "../../../theme/radius";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type MenuItemProps = {
  icon: IoniconName;
  label: string;
  value?: string;
  showChevron?: boolean;
};

const MenuItem = ({
  icon,
  label,
  value,
  showChevron = true,
}: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
    <View style={styles.menuItemLeft}>
      <View style={styles.menuIconContainer}>
        <Ionicons name={icon} size={18} color={COLORS.textSecondary} />
      </View>
      <Text style={styles.menuItemLabel}>{label}</Text>
    </View>
    <View style={styles.menuItemRight}>
      {value ? <Text style={styles.menuItemValue}>{value}</Text> : null}
      {showChevron ? (
        <Ionicons
          name="chevron-forward"
          size={16}
          color={COLORS.textMuted}
        />
      ) : null}
    </View>
  </TouchableOpacity>
);

export default function Profile() {
  return (
    <SafeAreaView style={commonStyles.screen} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Avatar */}
        <View style={[commonStyles.center, styles.avatarSection]}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={COLORS.textPrimary} />
          </View>
          <Text style={styles.userName}>Guest User</Text>
          <Text style={styles.userTag}>Movie Enthusiast</Text>
        </View>

        {/* Stats */}
        <View style={[commonStyles.row, styles.statsRow]}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Watched</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Watchlist</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <View style={styles.menuSection}>
          <MenuItem
            icon="moon-outline"
            label="Dark Mode"
            value="On"
            showChevron={false}
          />
          <MenuItem
            icon="notifications-outline"
            label="Notifications"
            value="Off"
            showChevron={false}
          />
        </View>

        <Text style={styles.sectionLabel}>ABOUT</Text>
        <View style={styles.menuSection}>
          <MenuItem
            icon="information-circle-outline"
            label="App Version"
            value="1.0.0"
            showChevron={false}
          />
          <MenuItem icon="shield-outline" label="Privacy Policy" />
          <MenuItem icon="document-text-outline" label="Terms of Service" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: SPACING.xxxl + 80,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.h2,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  avatarSection: {
    paddingVertical: SPACING.xxl,
    gap: SPACING.xs,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  userName: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  userTag: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  statsRow: {
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.lg,
    marginBottom: SPACING.xxl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: SPACING.xs,
  },
  statNumber: {
    fontSize: TYPOGRAPHY.h3,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: COLORS.border,
  },
  sectionLabel: {
    fontSize: TYPOGRAPHY.small,
    fontWeight: "600",
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xs,
    marginTop: SPACING.sm,
  },
  menuSection: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md + 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemLabel: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  menuItemValue: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
});
