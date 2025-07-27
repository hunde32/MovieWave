import { Client, Databases, Query, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const database = new Databases(client);
export const updateSearchCount = async (searchTerm, movie) => {
  if (!searchTerm) return; // Prevent query if searchTerm is empty or undefined
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    if (result.documents.length > 0) {
      const documentId = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        documentId.$id,
        {
          count: documentId.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster: movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "no-movie.png",
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
  }
};

export const getTrendingMovies = async () => {
    try{
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.orderDesc("count")],
            5 
        );
        return result.documents;

    }catch (error) {
      console.error("Error fetching trending movies:", error);
      throw error;
    }
}
