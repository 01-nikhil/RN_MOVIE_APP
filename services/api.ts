export const TMDB_CONFIG ={
    BASE_URL:'https://api.themoviedb.org/3',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjc1ODNjZTQ5ZjMxZWJiNjZiNzUzNzE5YzFiOWQyYyIsIm5iZiI6MTc1NzAwODkzNC44MzcsInN1YiI6IjY4YjlkNDI2YjVlOWMyNWU1Nzk4YWU2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f23rgFFmO4DAwbqipLabI3Ys8JU2f_Sy5mum_AtxKT8'
  }

}

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
export const fetchMovies=async({query}:{query:string})=>{
    const endpoint=query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response=await fetch(endpoint,{
        method:'GET',
        headers:TMDB_CONFIG.headers
    })

    if (!response.ok) {
    throw new Error(`Error fetching movies: ${response.status} ${response.statusText}`);
}


    const data=await response.json();
    // console.log("Fetched movies :"+ data.results?.length);
    return data.results;
}

export const fetchMovieDetails=async(movie_id:string):Promise<MovieDetails>=>{
    try {
        const response= await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movie_id}?api_key=${process.env.EXPO_PUBLIC_APPWRITE_API_KEY}`,{
            method:'GET',
            headers:TMDB_CONFIG.headers
        })

        const data=await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching Movie Details");
        throw error;
    }
}

