import {
  Gabarito,
  Geist,
  Geist_Mono,
  Instrument_Sans,
  Inter,
  Poppins,
  Quicksand,
  Urbanist,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const gabarito = Gabarito({ variable: "--font-gabarito", subsets: ["latin"] });
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pentol Ngetop",
  description: "Website Pemesanan Pentol Ngetop Terpercaya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${urbanist.variable} ${poppins.variable} ${quicksand.variable} ${inter.variable} ${gabarito.variable} ${instrumentSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
