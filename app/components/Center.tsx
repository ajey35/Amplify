"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useAtom } from "jotai";
import { playlistIdState } from "../atom/playlistIdAtom";
import { playlistState } from "../atom/playlistAtom";
import spotifyApi from "@/lib/spotify";
import Songs from "./Songs";
import CenterLoader from "../loaders/CenterLoader";
const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const { data: session } = useSession();
  const [bgColor, setBgColor] = useState(colors[0]);
  const [playlistId] = useAtom<string>(playlistIdState);
  const [playlist, setPlaylist] = useAtom(playlistState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setBgColor(shuffle(colors).pop()!);
  }, [playlistId]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (session?.user?.accessToken) {
        setIsLoading(true);
        try {
          spotifyApi.setAccessToken(session.user.accessToken);
          const data = await spotifyApi.getPlaylist(playlistId);
          setPlaylist(data.body);
        } catch (err) {
          console.error("Error fetching playlists:", err);
          signIn();
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchPlaylist();
  }, [session, playlistId, setPlaylist]);

  const profileImage = session?.user?.image?.trim() || "/default-avatar.png";

  if (isLoading) {
    return <CenterLoader />; // Show the loader when data is being fetched
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="sticky top-0 z-50 bg-black bg-opacity-0">
        <div className="absolute right-5 top-5">
          <div
            className="flex items-center rounded-full space-x-3 opacity-90 hover:opacity-100 p-1 pr-2 bg-gray-800 text-white cursor-pointer shadow-md hover:shadow-lg transition-shadow"
            onClick={() => signOut()}
          >
            <img
              src={profileImage}
              className="h-12 w-12 rounded-full object-cover"
              alt="User Profile"
            />
            <h1 className="font-medium text-sm md:text-base">{session?.user?.name || "Guest User"}</h1>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="overflow-y-scroll h-screen scrollbar-hide">
        <section
          className={`flex items-end space-x-7 bg-gradient-to-b ${bgColor} to-black h-80 text-white p-8`}
        >
          {playlist?.images?.[0]?.url && (
            <img
              src={playlist.images[0].url}
              className="h-44 w-44 shadow-sm object-cover"
              alt="Playlist Cover"
            />
          )}
          <div>
            <p className="text-xs sm:text-sm">PLAYLIST</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {playlist?.name}
            </h1>
          </div>
        </section>

        <div className="mt-5">
          <Songs spotifyApi={spotifyApi} />
        </div>
      </div>
    </div>
  );
}

export default Center;
