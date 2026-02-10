import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { commonStyles } from "../../../styles/commonStyles";
import { COLORS } from "../../../theme/colors";
import { SPACING } from "../../../theme/spacing";
import { TYPOGRAPHY } from "../../../theme/typography";
import { RADIUS } from "../../../theme/radius";

import useFetch from "../../../services/useFetch";
import { getSavedMovies } from "../../../services/appwrite";
import MovieCard from "../../../components/MovieCard";

export default function Saved() {
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);

  const {
    data: savedMovies,
    loading,
    error,
    refetch,
  } = useFetch(getSavedMovies);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch?.();
    } finally {
      setRefreshing(false);
    }
  };

  const renderMovie = useCallback(
    ({ item }: any) => (
      <MovieCard
        id={item.movie_id}
        title={item.title}
        poster_path={item.poster_url}
        vote={item.vote_average}
      />
    ),
    [],
  );

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name="bookmark-outline" size={56} color={COLORS.primary} />
      </View>

      <Text style={styles.title}>Your Watchlist is Empty</Text>

      <Text style={styles.subtitle}>
        Save movies you want to watch later and they'll appear here.
      </Text>

      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => router.push("/")}
        activeOpacity={0.8}
      >
        <Text style={styles.browseButtonText}>Browse Movies</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={[commonStyles.screen, commonStyles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[commonStyles.screen, commonStyles.center]}>
        <Ionicons name="alert-circle-outline" size={50} color={COLORS.error} />

        <Text style={styles.errorText}>Failed to load saved movies</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={commonStyles.screen} edges={["top"]}>
      <FlatList
        data={savedMovies || []}
        numColumns={3}
        keyExtractor={(item) => item.movie_id.toString()}
        renderItem={renderMovie}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Watchlist</Text>

            {/* <Text style={styles.headerSubtitle}>
              {savedMovies?.length || 0} saved movies
            </Text> */}

            {savedMovies && savedMovies.length > 0 && (
              <View style={styles.statsCard}>
                <Ionicons name="bookmark" size={24} color={COLORS.primary} />

                <View>
                  <Text style={styles.statsCount}>{savedMovies.length}</Text>

                  <Text style={styles.statsLabel}>Movies Saved</Text>
                </View>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={<EmptyComponent />}
        contentContainerStyle={[
          styles.content,
          savedMovies?.length === 0 && {
            flexGrow: 1,
          },
        ]}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={5}
        updateCellsBatchingPeriod={50}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxxl + 80,
  },

  header: {
    marginBottom: SPACING.lg,
  },

  headerTitle: {
    fontSize: TYPOGRAPHY.h1,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  headerSubtitle: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  statsCard: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  statsCount: {
    fontSize: TYPOGRAPHY.h3,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  statsLabel: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },

  iconContainer: {
    width: 110,
    height: 110,
    borderRadius: 999,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },

  title: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
  },

  subtitle: {
    marginTop: SPACING.sm,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },

  browseButton: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
  },

  browseButtonText: {
    color: COLORS.textPrimary,
    fontWeight: "600",
    fontSize: TYPOGRAPHY.body,
  },

  errorText: {
    marginTop: SPACING.sm,
    color: COLORS.error,
    fontSize: TYPOGRAPHY.body,
  },
});
