import {Client, Databases, ID, Query} from 'react-native-appwrite'

const DATABASE_ID=process.env.EXPO_PUBLIC_APPRWRITE_DATABASE_ID!
const COLLECTION_ID=process.env.EXPO_PUBLIC_APPRWRITE_COLLECTION_ID!
const SAVED_COLLECTION_ID=process.env.EXPO_PUBLIC_APPRWRITE_SAVED_COLLECTION_ID!

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const databases=new Databases(client)

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal('movie_id',movie.id)]
    );

    if(result.documents.length>0){
      const existingDocument=result.documents[0];
      await databases.updateDocument(DATABASE_ID,COLLECTION_ID,
        existingDocument.$id,
        {
          count:existingDocument.count+1
        }

      )
    }
    else{
      databases.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique(),{
        searchTerm:query,
        movie_id:movie.id,
        count:1,
        title:movie.title,
        poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`
      })
    }


    console.log("Appwrite search result:", result); // ✅ will log {"documents":[],"total":0} if nothing
  } catch (err) {
    console.error("updateSearchCount error:", err);
  }
};


export const getTrendingMovies= async():Promise<TrendingMovie[]|undefined>=>{
    try {
      const result= await databases.listDocuments(DATABASE_ID,COLLECTION_ID,[
        Query.limit(5),
        Query.orderDesc('count')
      ])
        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
      console.log(error) 
      return undefined
    }
}

export const saveMovie= async(movie:MovieDetails) => {
      const response=await databases.createDocument(DATABASE_ID,SAVED_COLLECTION_ID,ID.unique(),{
        movie_id:movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        release_date: movie.release_date,
        vote_average: Math.round(movie.vote_average),
      });
      console.log("Movie Saved "+ response);
      return response;
}

export const getSavedMovies=async()=>{
  return (await databases.listDocuments(DATABASE_ID,SAVED_COLLECTION_ID)).documents;
}

export const unsaveMovie=async(movie_id:number)=>{
    const response=await databases.listDocuments(DATABASE_ID,SAVED_COLLECTION_ID,[
      Query.equal('movie_id',movie_id)
    ])

    if(response.documents.length>0){
      return databases.deleteDocument(DATABASE_ID,SAVED_COLLECTION_ID,response.documents[0].$id)
    }
}





