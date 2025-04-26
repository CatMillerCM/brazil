import { Nunito, Charmonman} from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-nunito'
});

export const charmonman = Charmonman({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-charmonman'
});

export const metadata = {
  title: "SambaStack",
  description: "A NextJS app that allows you to create your own Brazilian beat using traditional instrument samples.",
  icons: {
    icon: '/favicon.ico'
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${charmonman.variable}`}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-?????????" />
    </html>
  );
};