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
          <header className="w-full px-3 flex gap-2 justify-center pt-10 pb-3 font-mono text-lg text-blue-500">
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
          <div className="w-full h-full">{children}</div>
          <div className="flex-grow"></div>
        </div>
      </body>
    </html>
  );
}
