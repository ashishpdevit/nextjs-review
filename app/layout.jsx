import React, { ReactNode } from "react";
import "./global.css";
// interface LayoutProps{
//   children: ReactNode
// }
import NavBar from "../components/NavBar";
import { orbitron } from "./font";

// export const metadata = {
//   title: "Indie Gamer",
//   description: "Only the best Indie Games for you !",
// };
export const metadata = {
  title: {
    default: "Indie Gamer",
    template: "%s | Indie Gamer",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={orbitron.variable}>
      <body className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen">
        <header>
          <NavBar />
        </header>
        <main className="grow py-3"> {children}</main>
        <footer className="border-t py-3 text-center text-xs">
          Game data and image courtesy of{" "}
          <a
            href="http://rawg.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-800 hover:underline"
          >
            RAWG
          </a>
        </footer>
      </body>
    </html>
  );
}
