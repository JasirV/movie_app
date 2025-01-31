import { TMDB_BASE_URL, TMDB_IMAGE_BASE_URL, ENDPOINTS } from '../constants/urls';
import axios from 'axios';

const api = axios.create({
    baseURL: TMDB_BASE_URL,
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTIzNjY0NDRiMGUzZjZiZTE1YWJiYTdkZTQ4YjIxNyIsIm5iZiI6MTczODI0NTIzOS4xNzQsInN1YiI6IjY3OWI4NDc3Y2ViNDllNjcxZDM0NWU3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ksrqg_4ssnZ-WWYb43yWnllZlSPcBPC8av5mbCkrPzc`,
    },
});

// Handle API errors and return only `data`
const getNowPlayingMovies = async () => {
    try {
        const response = await api.get(ENDPOINTS.NOW_PLAYING_MOVIES);
        return response; // Return only the movie data
    } catch (error) {
        console.error("Error fetching now playing movies:", error.response?.data || error.message);
        return null; // Return null if API call fails
    }
}; 
const getUpcomingMovies = async () => {
    try {
        const response = await api.get(ENDPOINTS.UPCOMING_MOVIES);
        return response; // Return only the movie data
    } catch (error) {
        console.error("Error fetching now playing movies:", error.response?.data || error.message);
        return null; // Return null if API call fails
    }
}; 
const getGenres = async () => {
    try {
        const response = await api.get(ENDPOINTS.GENRES);
        return response; // Return only the movie data
    } catch (error) {
        console.error("Error fetching now playing movies:", error.response?.data || error.message);
        return null; // Return null if API call fails
    }
}; 
const getMovie = async (id) => {
    try {
        const response = await api.get(`${ENDPOINTS.MOVIE}/${id}`);
        return response; // Return only the movie data
    } catch (error) {
        console.error("Error fetching now playing movies:", error.response?.data || error.message);
        return null; // Return null if API call fails
    }
}; 

// Function to get the full poster URL
const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original/${path}`;

export { getNowPlayingMovies, getPoster,getUpcomingMovies,getGenres,getMovie }