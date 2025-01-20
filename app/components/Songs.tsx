import { useAtom } from "jotai";
import React from "react";
import { playlistState } from "../atom/playlistAtom";
import Song from "./Song";

const Songs = ({ spotifyApi }) => {
  const [playlist] = useAtom(playlistState);
  console.log("Play list",playlist);
  if (!playlist) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-white">
        <p className="text-lg">Loading playlist...</p>
      </div>
    );
  }

  if (!playlist.tracks?.items?.length) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-white">
        <p className="text-lg">No songs in this playlist yet</p>
      </div>
    );
  }

  return (
    <div className="text-white px-2 sm:px-4 md:px-6 lg:px-8 flex flex-col space-y-1 pb-28 w-full max-w-7xl mx-auto">
      <div className="grid gap-1">
        {playlist.tracks.items.map((trackItem, i) => (
          <Song
            spotifyApi={spotifyApi}
            key={`${trackItem?.track?.id || i}-${i}`}
            tracks={trackItem}
            order={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Songs;