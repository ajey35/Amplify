// pages/index.js
import { getServerSession } from "next-auth/next";
import Sidebar from "./components/Sidebar";
import Center from "./components/Center";
import {Player} from "./components/Player";
export default function Home({ session }) {
  return (
    <div className="bg-black overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className="absolute w-full bottom-0">
        <Player/>
      </div>
    </div>
  );
}

