// context/PlaylistContext.tsx
import { createContext } from 'react';

// Define the type for the context state
interface PlaylistContextType {
  playlistId: string;  // The state we want to manage
  setPlaylistId: (id: string) => void;  // The function to update the state
}

// Create the context with default value of `undefined`
export const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);
