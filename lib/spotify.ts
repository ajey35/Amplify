import SpotifyWebApi from "spotify-web-api-node";

// Define scopes (space-separated)
const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read"
].join(" "); // Space-separated scopes

// Generate Spotify login URL
const params = {
  scope: scopes,
};

const queryParamsString = new URLSearchParams(params).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString}`;

// Create Spotify API instance
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI, // Ensure this is in your .env.local
});

export { LOGIN_URL };
export default spotifyApi;
