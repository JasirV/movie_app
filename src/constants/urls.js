const TMDB_BASE_URL="https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL="https://image.tmdb.org/t/p"

const TMDB_API_KEY="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTIzNjY0NDRiMGUzZjZiZTE1YWJiYTdkZTQ4YjIxNyIsIm5iZiI6MTczODI0NTIzOS4xNzQsInN1YiI6IjY3OWI4NDc3Y2ViNDllNjcxZDM0NWU3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ksrqg_4ssnZ-WWYb43yWnllZlSPcBPC8av5mbCkrPzc"

const YOUTUBE_BASE_URL="https://www.youtube.com/watch"
const ENDPOINTS ={
    NOW_PLAYING_MOVIES:'/movie/now_playing',
    UPCOMING_MOVIES:'/movie/upcoming',
    GENRES:"/genre/movie/list",
    MOVIE:"/movie"
}

const  APPEEND_TO_RESPONSE={
    VIDEOS:'videos',
    CREDITS: "credits",
    RECOMMENDATIONS: "recommendations",
    SIMILAR: "similar",
}
export {TMDB_BASE_URL,TMDB_API_KEY,TMDB_IMAGE_BASE_URL,ENDPOINTS,APPEEND_TO_RESPONSE,YOUTUBE_BASE_URL}  