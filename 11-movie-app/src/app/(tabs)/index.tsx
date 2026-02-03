import {
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { commonStyles } from "../../../styles/commonStyles";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import SearchBar from "../../../components/SearchBar";
import useFetch from "../../../services/useFetch";
import { fetchMovies } from "../../../services/api";
import MovieCard from "../../../components/MovieCard";
import { COLORS } from "../../../theme/colors";
import { SPACING } from "../../../theme/spacing";
import { TYPOGRAPHY } from "../../../theme/typography";
import { GRADIENTS } from "../../../theme/gradients";
import { getTrendingMovies } from "../../../services/appwrite";
import TrendingMovieCard from "../../../components/TrendingMovieCard";
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

export default function Index() {
  //router for navigating to movie details or search screen
  const router = useRouter();

  //used useFetch hook to fetch initial popular movies and trending movies
  const {
    data: initialMovies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => getTrendingMovies());

  //States for movies list, pagination and loading more indicator
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  //load initial movies into the movies state when fetched
  useEffect(() => {
    if (initialMovies) {
      setMovies(initialMovies);
    }
  }, [initialMovies]);

  //Function to load more movies when user scrolls to the end of the list
  const loadMoreMovies = async () => {
    if (loadingMore) return;

    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const newMovies = await fetchMovies({
        query: "",
        page: nextPage,
      });

      setMovies((prev) => [...prev, ...newMovies]);
      setPage(nextPage);
    } finally {
      setLoadingMore(false);
    }
  };

  //Render loading indicator if either movies or trending movies are still loading
  if (moviesLoading || trendingLoading) {
    return (
      <View style={[commonStyles.screen, commonStyles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  //Render error message if there was an error fetching either movies or trending movies
  if (moviesError || trendingError) {
    return (
      <View style={[commonStyles.screen, commonStyles.center]}>
        <Text style={styles.errorText}>
          {moviesError?.message || trendingError?.message}
        </Text>
      </View>
    );
  }

  return (
    //Main screen layout with header, search bar, trending movies section and popular movies list
    <View style={commonStyles.screen}>
      {/* FlatList for displaying movies with header and footer components for
      search bar and loading indicator;
      1.data prop = we can directly pass movies state which will update as we load more movies;
      2.renderItem prop = will use MovieCard component to display each movie in a grid layout
      3.listHeaderComponent = will contain the app logo, search bar and trending movies section;
      4.listFooterComponent = will show a loading indicator when more movies are being loaded */}
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
        ListHeaderComponent={
          <>
            <LinearGradient
              colors={GRADIENTS.header}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.header}
            >
              <Image
                source={require("../../../assets/logo/MoviesX_Logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </LinearGradient>

            <SearchBar
              placeholder="Search movies..."
              onPress={() => router.push("/search")}
            />

            {trendingMovies && trendingMovies.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Trending Now</Text>
                <FlatList
                  data={trendingMovies.slice(0, 5)}
                  keyExtractor={(item) => item.movie_id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.trendingContainer}
                  renderItem={({ item, index }) => (
                    <TrendingMovieCard
                      id={item.movie_id}
                      title={item.title}
                      poster_url={item.poster_url}
                      index={index}
                    />
                  )}
                />
              </>
            )}

            <Text style={styles.sectionTitle}>Popular Movies</Text>
          </>
        }
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="small"
              color={COLORS.primary}
              style={{ marginVertical: 20 }}
            />
          ) : null
        }
        onEndReached={loadMoreMovies} //calls loadMoreMovies function when user scrolls to the end of the list
        onEndReachedThreshold={0.5} //triggers onEndReached when user is within 50% of the end of the list
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: SPACING.sm,
    paddingBottom: SPACING.xxxl + 80,
  },
  header: {
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 130,
    height: 130,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.h3,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  errorText: {
    color: COLORS.error,
    textAlign: "center",
    fontSize: TYPOGRAPHY.body,
  },
  trendingContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    gap: SPACING.sm,
  },
});
