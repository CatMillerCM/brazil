import { Nunito, Charmonman} from "next/font/google";
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
  title: "",
  description: "",
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
    </html>
  );
};