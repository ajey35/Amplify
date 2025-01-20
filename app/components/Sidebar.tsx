"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import {
  BuildingLibraryIcon,
  HeartIcon,
  HomeIcon,
  PlusCircleIcon,
  RssIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import spotifyApi from "@/lib/spotify";
import { useAtom } from "jotai";
import { playlistIdState } from "../atom/playlistIdAtom";

const Sidebar = () => {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useAtom(playlistIdState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      const toggleButton = document.getElementById("sidebar-toggle");

      if (
        isSidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        toggleButton &&
        !toggleButton.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const handlePlaylistSelect = useCallback(
    (id) => {
      setPlaylistId(id);
      setIsSidebarOpen(false);
    },
    [setPlaylistId]
  );

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (session?.user?.accessToken) {
        try {
          spotifyApi.setAccessToken(session.user.accessToken);
          const data = await spotifyApi.getUserPlaylists();
          setPlaylists(data.body.items);
        } catch (err) {
          console.error("Error fetching playlists:", err);
          if (err.body?.error?.status === 401) {
            signIn();
          }
        }
      }
    };
    fetchPlaylists();
  }, [session]);

  const menuItems = [
    { icon: HomeIcon, text: "Home" },
    { icon: MagnifyingGlassIcon, text: "Search" },
    { icon: BuildingLibraryIcon, text: "Your Library" },
  ];

  const playlistControls = [
    { icon: PlusCircleIcon, text: "Create Playlist" },
    { icon: HeartIcon, text: "Liked Songs" },
    { icon: RssIcon, text: "Your Episodes" },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        id="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 md:hidden z-50 bg-black p-2 rounded-full shadow-lg 
                   hover:scale-105 transition-transform duration-200"
      >
        <Bars3Icon className="h-6 w-6 text-white" />
      </button>

      {/* Main Sidebar */}
      <aside
        id="sidebar"
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-black 
                   transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                   md:translate-x-0 transition-transform duration-300 ease-in-out z-40 overflow-y-scroll scrollbar-hide`}
      >
        {/* Close Button - Mobile Only */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white 
                   transition-colors duration-200"
        >
          <XMarkIcon className="h-8 w-8" />
        </button>

        {/* Static Menu Items */}
        <div className="px-6 pt-8">
          <div className="space-y-6">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center space-x-4 text-gray-400 hover:text-white 
                         w-full group transition-colors duration-200"
              >
                <item.icon className="h-6 w-6 group-hover:scale-105 transition-transform" />
                <span className="font-medium">{item.text}</span>
              </button>
            ))}
          </div>
        </div>

        <hr className="border-t border-gray-800 mx-6 my-4" />

        {/* Playlist Controls */}
        <div className="px-6">
          <div className="space-y-4">
            {playlistControls.map((item, index) => (
              <button
                key={index}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center space-x-4 text-gray-400 hover:text-white 
                         w-full group transition-colors duration-200"
              >
                <item.icon className="h-6 w-6 group-hover:scale-105 transition-transform" />
                <span className="font-medium">{item.text}</span>
              </button>
            ))}
          </div>
        </div>

        <hr className="border-t border-gray-800 mx-6 my-4" />

        {/* Scrollable Playlists */}
        <div className="px-6 pb-20">
          <div className="space-y-3">
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => handlePlaylistSelect(playlist.id)}
                className="text-gray-400 hover:text-white w-full text-left truncate 
                         py-1 transition-colors duration-200"
              >
                {playlist.name}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
