import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Faith Journey Survey",
    template: "%s | Faith Journey Survey",
  },
  description:
    "Share your faith journey through our anonymous survey about faith and the Bible.",
  keywords: [
    "faith",
    "survey",
    "religion",
    "bible",
    "christianity",
    "anonymous survey",
    "faith journey",
  ],
  authors: [{ name: "Faith Journey Survey" }],
  creator: "Faith Journey Survey",
  publisher: "Faith Journey Survey",
  robots: {
    index: true,
    follow: true,
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Faith Journey Survey",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
