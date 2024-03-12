import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raul's Portfolio",
  description:
    "A place where I share my current projects, journals and opinions ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="w-full pr-10 flex gap-2 justify-end pt-5 pb-3 font-mono text-lg bg-blue-500 shadow-lg shadow-[#00000080]">
            <Link href="/" className="hover:underline">
              {"Home"}
            </Link>
            <Link href="/journals" className="hover:underline">
              {"Projects"}
            </Link>
            <Link href="/journals" className="hover:underline">
              {"Journals"}
            </Link>
            <Link href="/journals" className="hover:underline">
              {"Blog"}
            </Link>
          </header>
          <div className="w-full h-full flex-grow flex flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
