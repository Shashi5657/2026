import { Link } from "expo-router";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

interface MovieProps {
  id: number;
  poster_url: string;
  title: string;
  index: number;
}

export default function TrendingMovieCard({
  id,
  title,
  poster_url,
  index,
}: MovieProps) {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.rank}>{index + 1}</Text>

          <Image source={{ uri: poster_url }} style={styles.poster} />

          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    marginRight: 16,
    position: "relative",
  },

  rank: {
    position: "absolute",
    left: -12,
    bottom: 20,
    fontSize: 60,
    fontWeight: "900",
    color: "rgba(255,255,255,0.55)",
    zIndex: 1,

    textShadowColor: "rgba(0,0,0,0.95)",
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 2,
  },
  poster: {
    width: 110,
    height: 165,
    borderRadius: 12,
  },
  title: {
    marginTop: 6,
    color: "#fff",
    fontSize: 12,
  },
});
