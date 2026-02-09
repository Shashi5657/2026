import { Text, TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { RADIUS } from "../theme/radius";
import { TYPOGRAPHY } from "../theme/typography";

interface MovieProps {
  id: number;
  poster_path: string | null;
  title: string;
  vote?: number;
}

const MovieCard = ({ id, poster_path, title, vote }: MovieProps) => {
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://placehold.co/500x750/181F29/9CA3AF?text=No+Image";

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity style={styles.container} activeOpacity={0.75}>
        <View style={styles.posterContainer}>
          <Image
            source={{ uri: posterUrl }}
            style={styles.poster}
            resizeMode="cover"
          />
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>⭐ {vote?.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SPACING.xs,
    maxWidth: "32%",
  },
  posterContainer: {
    position: "relative",
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: RADIUS.sm,
  },
  ratingBadge: {
    position: "absolute",
    top: SPACING.xs,
    right: SPACING.xs,
    backgroundColor: COLORS.overlay,
    paddingHorizontal: SPACING.xs + 2,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  ratingText: {
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.small,
    fontWeight: "600",
  },
  title: {
    color: COLORS.textPrimary,
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.small,
    fontWeight: "600",
  },
});

export default MovieCard;