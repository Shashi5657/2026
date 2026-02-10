import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../../../components/SearchBar";
import MovieCard from "../../../components/MovieCard";
import { fetchMovies } from "../../../services/api";
import { commonStyles } from "../../../styles/commonStyles";
import { COLORS } from "../../../theme/colors";
import { SPACING } from "../../../theme/spacing";
import { TYPOGRAPHY } from "../../../theme/typography";
import useFetch from "../../../services/useFetch";
import {
  getTrendingMovies,
  updateSearchCount,
} from "../../../services/appwrite";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

export default function Search() {
  const [query, setQuery] = useState("");

  const {
    data: movies,
    loading,
    error: hasError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query }), false);

  // Debounce: trigger search 500ms after the user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        loadMovies();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  // Record search only after movies state has actually updated
  useEffect(() => {
    if (movies && movies.length > 0 && query.trim()) {
      updateSearchCount(query, movies[0]).catch(console.error);
    }
  }, [movies]);

  // useEffect(() => {
  //   if (!query.trim()) {
  //     setMovies([]);
  //     setHasError(false);
  //     return;
  //   }

  //   const timer = setTimeout(async () => {
  //     setLoading(true);
  //     setHasError(false);
  //     try {
  //       const results = await fetchMovies({ query });
  //       setMovies(results ?? []);
  //     } catch {
  //       setHasError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [query]);

  const renderEmpty = () => {
    if (loading) return null;

    if (!query.trim()) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="film-outline" size={64} color={COLORS.textMuted} />
          <Text style={styles.emptyTitle}>Find Your Next Watch</Text>
          <Text style={styles.emptySubtitle}>
            Search for movies by title, actor, or genre
          </Text>
        </View>
      );
    }

    if (hasError) {
      return (
        <View style={styles.emptyState}>
          <Ionicons
            name="alert-circle-outline"
            size={64}
            color={COLORS.error}
          />
          <Text style={styles.emptyTitle}>Something Went Wrong</Text>
          <Text style={styles.emptySubtitle}>Please try again</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <Ionicons name="search-outline" size={64} color={COLORS.textMuted} />
        <Text style={styles.emptyTitle}>No Results Found</Text>
        <Text style={styles.emptySubtitle}>
          Try a different title or keyword
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={commonStyles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      <SearchBar
        placeholder="Search movies..."
        value={query}
        onChangeText={setQuery}
      />

      {loading && (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={styles.loader}
        />
      )}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <MovieCard
            id={item.id}
            poster_path={item.poster_path}
            title={item.title}
            vote={item.vote_average}
          />
        )}
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xs,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.h2,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  loader: {
    marginTop: SPACING.xxl,
  },
  listContent: {
    paddingHorizontal: SPACING.sm,
    paddingBottom: SPACING.xxxl + 80,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: SPACING.section * 2,
    paddingHorizontal: SPACING.xxxl,
    gap: SPACING.md,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
});
