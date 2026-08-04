import type { Metadata } from "next";
import { Playfair_Display, Inter, Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { BRAND, SITE_URL } from "@/lib/constants";
import { StructuredData } from "@/components/StructuredData";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { BookingProvider } from "@/components/booking/booking-context";
import { BookingDialog } from "@/components/booking/BookingDialog";
import { IntroLoader } from "@/components/intro/IntroLoader";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { FloatingContactButtons } from "@/components/effects/FloatingContactButtons";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-buttons",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.full} | Luxury Wedding Styling & Event Coordination`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "All J Dream Styling and Events is a boutique wedding styling and event coordination studio crafting refined, emotionally resonant celebrations for weddings, debuts, and luxury social events.",
  keywords: [
    "wedding styling",
    "wedding coordination",
    "event styling",
    "luxury wedding planner",
    "reception styling",
    "debut styling",
  ],
  openGraph: {
    title: `${BRAND.full} | Luxury Wedding Styling & Event Coordination`,
    description:
      "Boutique wedding styling and event coordination — creating dream celebrations filled with love, beauty, and elegance.",
    url: SITE_URL,
    siteName: BRAND.full,
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: BRAND.full,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.full} | Luxury Wedding Styling & Event Coordination`,
    description:
      "Boutique wedding styling and event coordination — creating dream celebrations filled with love, beauty, and elegance.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${poppins.variable}`}>
      <body className="font-body">
        <StructuredData />
        <BookingProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <IntroLoader />
            <ScrollProgress />
            {children}
            <FloatingContactButtons />
            <BookingDialog />
          </SmoothScrollProvider>
        </BookingProvider>
        <Toaster />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
