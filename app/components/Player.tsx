"use client"
import { useAtom } from "jotai";
import { currentSongIdState, volumeState, isPlayingState } from "../atom/songAtom";
import spotifyApi from "@/lib/spotify";
import { useCallback, useEffect } from "react";
import useSongInfo from "../hooks/useSongInfo";
import { useSession, signIn } from "next-auth/react";
import { 
  BackwardIcon,
  ForwardIcon, 
  PauseCircleIcon, 
  PlayCircleIcon,
  ArrowPathRoundedSquareIcon
} from "@heroicons/react/24/solid";
import { 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon 
} from "@heroicons/react/24/outline";
import { debounce } from "lodash";

export const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.accessToken) {
      try {
        spotifyApi.setAccessToken(session.user.accessToken);
      } catch (err) {
        console.error("Error setting access token:", err);
        signIn();
      }
    }
  }, [session]);

  return spotifyApi;
};

export function Player() {
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] = useAtom(currentSongIdState);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingState);
  const [volume, setVolume] = useAtom(volumeState);
  const spotifyApi = useSpotify();
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data?.body?.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data?.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => console.error(err));
    }, 500),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  return (
    <div className="fixed lg:z-50 bottom-0 left-0 right-0 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
      <div className="max-w-screen-2xl mx-auto px-4 py-3">
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Left - Song Info */}
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <img
                className="h-12 w-12 rounded-md object-cover shadow-lg"
                src={songInfo?.album?.images?.[0]?.url}
                alt={songInfo?.name || "Album cover"}
              />
              {isPlaying && (
                <div className="absolute bottom-1 right-1 w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-white font-medium truncate">{songInfo?.name}</h3>
              <p className="text-gray-400 text-sm truncate">{songInfo?.artists?.[0]?.name}</p>
            </div>
          </div>

          {/* Center - Controls */}
          <div className="flex items-center justify-center gap-4">
            <BackwardIcon className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
            <div className="flex items-center justify-center h-10 w-10">
              {isPlaying ? (
                <PauseCircleIcon
                  onClick={handlePlayPause}
                  className="h-10 w-10 text-white hover:scale-105 transition-transform cursor-pointer"
                />
              ) : (
                <PlayCircleIcon
                  onClick={handlePlayPause}
                  className="h-10 w-10 text-white hover:scale-105 transition-transform cursor-pointer"
                />
              )}
            </div>
            <ForwardIcon className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
            <ArrowPathRoundedSquareIcon className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
          </div>

          {/* Right - Volume */}
          <div className="flex items-center justify-end gap-2">
            <SpeakerXMarkIcon
              onClick={() => volume > 0 && setVolume(volume - 5)}
              className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer"
            />
            <div className="group relative flex-1 max-w-[150px]">
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer
                          range-sm accent-white hover:accent-green-500 transition-all"
              />
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 
                             opacity-0 group-hover:opacity-100 transition-opacity
                             bg-gray-800 text-white text-xs px-2 py-1 rounded">
                {volume}%
              </span>
            </div>
            <SpeakerWaveIcon
              onClick={() => volume < 100 && setVolume(volume + 5)}
              className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}