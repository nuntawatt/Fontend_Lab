import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "daisyui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon NextJS",
  description: "Pokemon Next.JS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="navbar bg-yellow-400 shadow-md">
          <div className="navbar-start">
            {/* Dropdown for mobile */}
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-yellow-500 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
              >
                <li><a href="/">Home</a></li>
                <li><a href="/pokemon">Pokémon</a></li>
                <li><a href="https://nuntawatt.github.io/nanthawat.github.io/">About Me</a></li>
              </ul>
            </div>

            <a className="btn btn-ghost text-2xl font-bold text-red-600">
              Nuntawat Seahuam
            </a>
          </div>

          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-xl text-red-600 space-x-4">
              <li><a href="/">Home</a></li>
              <li><a href="/pokemon">Pokémon</a></li>
              <li>
                <a href="https://nuntawatt.github.io/nanthawat.github.io/" target="_blank" rel="noopener noreferrer">
                  About Me
                </a>
              </li>
            </ul>
          </div>
        </div>

        <main className="flex-grow flex items-center justify-center">
          <div className="container mx-auto p-5">{children}</div>
        </main>

        {/* Footer */}
        <footer className="bg-yellow-400 text-center py-4">
          <p className="text-red-600">
            Pokemon BY Moragon. © 2024 Pokémon NextJS
          </p>
        </footer>
      </body>
    </html>
  );
}
