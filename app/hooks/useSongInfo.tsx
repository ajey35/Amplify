import { useAtom } from "jotai";
import { currentSongIdState, songInfoState} from "../atom/songAtom";
import { use, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import spotifyApi from "@/lib/spotify";
function useSongInfo() {
    const{data:session} = useSession()
    const [currentTrackId,setCurrentTrackId] = useAtom(currentSongIdState);
    const [songInfo,setSongInfo] = useAtom(songInfoState)
    useEffect(() => {
        const fetchPlaylists = async () => {
          if (session?.user?.accessToken) {
            try {
              spotifyApi.setAccessToken(session.user.accessToken);

            } catch (err) {
              console.error("Error fetching playlists:", err);
                signIn(); // Token expired, redirect to sign in
            }
          }
        };
        fetchPlaylists();
      }, [session]);


      useEffect(()=>{
        const fetchSongInfo = async ()=>{
            if(currentTrackId){
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`,{
                    headers:{
                        Authorization:`Bearer ${spotifyApi.getAccessToken()}`
                    }
                }).then((res)=>res.json())
                setSongInfo(trackInfo)
            }
        }
        fetchSongInfo();
      },[currentTrackId,spotifyApi])

  return songInfo;
}

export default useSongInfo