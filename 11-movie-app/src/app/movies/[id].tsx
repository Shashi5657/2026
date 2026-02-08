import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "../../../services/useFetch";
import { fetchMovieDetails } from "../../../services/api";
import { COLORS } from "../../../theme/colors";
import { SPACING } from "../../../theme/spacing";
import { TYPOGRAPHY } from "../../../theme/typography";
import { RADIUS } from "../../../theme/radius";
import { GRADIENTS } from "../../../theme/gradients";
import { isMovieSaved, toggleSavedMovie } from "../../../services/appwrite";

const { width } = Dimensions.get("window");
const BACKDROP_HEIGHT = width * 0.6;

type Genre = { id: number; name: string };

type MovieDetail = {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number | null;
  genres: Genre[];
  status: string;
};

const formatRuntime = (mins: number | null) => {
  if (!mins) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const {
    data: movie,
    loading,
    error,
  } = useFetch<MovieDetail>(() => fetchMovieDetails(Number(id)));

  const handleSave = async () => {
    const result = await toggleSavedMovie(movie);
    setSaved(result.saved);
  };

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!movie) return;
      const saved = await isMovieSaved(movie.id);
      setSaved(saved);
    };

    checkSavedStatus();
  }, [movie]);

  const backdropUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : movie?.poster_path
      ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
      : null;

  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "https://placehold.co/342x513/181F29/9CA3AF?text=No+Image";

  const releaseYear = movie?.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  if (loading) {
    return (
      <View style={styles.centeredScreen}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.centeredScreen}>
        <Ionicons name="alert-circle-outline" size={48} color={COLORS.error} />
        <Text style={styles.errorText}>Failed to load movie details</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.goBackButton}
          activeOpacity={0.8}
        >
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Floating back button — sits above the scroll */}
      <SafeAreaView
        style={styles.backBtnWrapper}
        edges={["top"]}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </SafeAreaView>

      <SafeAreaView
        style={styles.saveBtnWrapper}
        edges={["top"]}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          onPress={handleSave}
          style={styles.saveBtn}
          activeOpacity={0.8}
        >
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={22}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Backdrop */}
        <View style={styles.backdropContainer}>
          {backdropUrl ? (
            <Image
              source={{ uri: backdropUrl }}
              style={styles.backdrop}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.backdrop, styles.backdropFallback]} />
          )}
          <LinearGradient
            colors={GRADIENTS.backdropOverlay}
            style={StyleSheet.absoluteFill}
          />
        </View>

        {/* Main content */}
        <View style={styles.content}>
          {/* Poster + Info */}
          <View style={styles.posterRow}>
            <Image
              source={{ uri: posterUrl }}
              style={styles.poster}
              resizeMode="cover"
            />
            <View style={styles.infoColumn}>
              <Text style={styles.title}>{movie.title}</Text>
              {movie.tagline ? (
                <Text style={styles.tagline}>"{movie.tagline}"</Text>
              ) : null}
              <View style={styles.chipsRow}>
                <View style={styles.ratingChip}>
                  <Ionicons name="star" size={13} color={COLORS.accent} />
                  <Text style={styles.ratingChipText}>
                    {movie.vote_average.toFixed(1)}
                  </Text>
                </View>
                {releaseYear ? (
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{releaseYear}</Text>
                  </View>
                ) : null}
                {movie.runtime ? (
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>
                      {formatRuntime(movie.runtime)}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>

          {/* Genre tags */}
          {movie.genres.length > 0 ? (
            <View style={styles.genresRow}>
              {movie.genres.map((g) => (
                <View key={g.id} style={styles.genreTag}>
                  <Text style={styles.genreText}>{g.name}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Overview */}
          {movie.overview ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.overview}>{movie.overview}</Text>
            </View>
          ) : null}

          {/* Details card */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.detailsCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status</Text>
                <Text style={styles.detailValue}>{movie.status}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Release Date</Text>
                <Text style={styles.detailValue}>{movie.release_date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>User Votes</Text>
                <Text style={styles.detailValue}>
                  {movie.vote_count.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centeredScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.md,
  },
  errorText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
    textAlign: "center",
  },
  goBackButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.lg,
    marginTop: SPACING.sm,
  },
  goBackButtonText: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  backBtnWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  saveBtnWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
  },
  saveBtn: {
    margin: SPACING.lg,
    width: 40,
    height: 40,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.overlay,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: {
    margin: SPACING.lg,
    width: 40,
    height: 40,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.overlay,
    alignItems: "center",
    justifyContent: "center",
  },
  backdropContainer: {
    height: BACKDROP_HEIGHT,
    backgroundColor: COLORS.surface,
  },
  backdrop: {
    width: "100%",
    height: "100%",
  },
  backdropFallback: {
    backgroundColor: COLORS.card,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  posterRow: {
    flexDirection: "row",
    gap: SPACING.lg,
    marginTop: -SPACING.xxl,
    marginBottom: SPACING.lg,
  },
  poster: {
    width: 110,
    height: 165,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  infoColumn: {
    flex: 1,
    paddingTop: SPACING.xxl,
    gap: SPACING.sm,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: TYPOGRAPHY.h3,
    fontWeight: "700",
    color: COLORS.textPrimary,
    lineHeight: 28,
  },
  tagline: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontStyle: "italic",
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.xs,
  },
  ratingChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    gap: 3,
    borderWidth: 1,
    borderColor: COLORS.accent + "50",
  },
  ratingChipText: {
    color: COLORS.accent,
    fontSize: TYPOGRAPHY.small,
    fontWeight: "700",
  },
  chip: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.small,
  },
  genresRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.xs,
    marginBottom: SPACING.lg,
  },
  genreTag: {
    backgroundColor: COLORS.primary + "20",
    borderRadius: RADIUS.round,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.primary + "40",
  },
  genreText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.small,
    fontWeight: "600",
  },
  section: {
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  overview: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  detailsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  detailLabel: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
});
