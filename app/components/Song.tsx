import React from 'react';
import { MilliToMinute } from '@/lib/time';
import { useAtom } from 'jotai';
import { currentSongIdState, isPlayingState } from '../atom/songAtom';

const Song = ({ order, tracks, spotifyApi }) => {
  const [currentTrackId, setCurrentTrackId] = useAtom(currentSongIdState);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingState);

  const PlaySong = () => {
    setCurrentTrackId(tracks.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [tracks.track.uri],
    });
  };

  const isCurrentSong = currentTrackId === tracks.track.id;

  return (
    <div
      className={`grid grid-cols-2 text-gray-500 px-5 py-4 
        hover:bg-gray-900 rounded-lg cursor-pointer transition-all
        ${isCurrentSong ? 'bg-gray-800' : ''}`}
      onClick={PlaySong}
    >
      <div className="flex items-center space-x-4">
        <p className="text-sm w-4">{order + 1}</p>
        <div className="relative h-10 w-10 flex-shrink-0">
          <img 
            className="rounded object-cover h-10 w-10"
            src={tracks?.track?.album?.images[0]?.url} 
            alt="" 
          />
          {isCurrentSong && isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          )}
        </div>
        <div>
          <p className={`w-36 lg:w-64 truncate ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>
            {tracks?.track?.name}
          </p>
          <p className="w-40 truncate text-sm text-gray-400">
            {tracks?.track?.artists[0]?.name}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline w-40 truncate text-sm">
          {tracks?.track?.album?.name}
        </p>
        <p className="text-sm text-gray-400">
          {MilliToMinute(tracks?.track?.duration_ms)}
        </p>
      </div>
    </div>
  );
};

export default Song;