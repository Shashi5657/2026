import { Client, Databases, ID, Query } from "react-native-appwrite";

const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const databases = new Databases(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;

export const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

export const SAVED_TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_TABLE_ID!;

export const updateSearchCount = async (query: string, movie: any) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.equal("searchTerm", query),
    ]);
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await databases.updateDocument(DATABASE_ID, TABLE_ID, existingMovie.$id, {
        count: existingMovie.count + 1,
      });
    } else {
      await databases.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const isMovieSaved = async (movieId: number) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, SAVED_TABLE_ID, [
      Query.equal("movie_id", movieId),
    ]);
    return result.documents.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const toggleSavedMovie = async (movie: any) => {
  try {
    const existingMovie = await databases.listDocuments(
      DATABASE_ID,
      SAVED_TABLE_ID,
      [Query.equal("movie_id", movie.id)],
    );

    if (existingMovie.documents.length > 0) {
      await databases.deleteDocument(
        DATABASE_ID,
        SAVED_TABLE_ID,
        existingMovie.documents[0].$id,
      );
      return {
        saved: false,
        message: "Movie removed from saved list",
      };
    }

    await databases.createDocument(DATABASE_ID, SAVED_TABLE_ID, ID.unique(), {
      movie_id: movie.id,
      title: movie.title,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      vote_average: movie.vote_average,
    });

    return {
      saved: true,
      message: "Movie saved successfully",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSavedMovies = async () => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, SAVED_TABLE_ID);
    return result.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};
