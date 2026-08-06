import type { Metadata } from "next";
import { Inter, Marcellus } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWhatsapp } from "@/components/layout/floating-whatsapp";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Advocacia em Florianópolis`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: [{ url: "/logo/icon.png", type: "image/png" }],
    shortcut: "/logo/icon.png",
    apple: "/logo/icon.png",
  },
  openGraph: {
    title: `${site.name} — Advocacia em Florianópolis`,
    description: site.description,
    type: "website",
    locale: "pt_BR",
  },
};

// Applies the theme before first paint so there is no flash of the wrong theme.
// First visit follows the OS preference (prefers-color-scheme); once the visitor
// toggles manually, that saved choice wins. While no manual choice exists, the
// page keeps tracking OS changes live.
const themeInitScript = `(function(){try{var s=localStorage.getItem("theme");var m=window.matchMedia("(prefers-color-scheme: dark)");var dark=s?s==="dark":m.matches;document.documentElement.classList.toggle("dark",dark);if(!s){m.addEventListener("change",function(e){if(!localStorage.getItem("theme"))document.documentElement.classList.toggle("dark",e.matches)})}}catch(e){document.documentElement.classList.add("dark")}})();`;

// Take control of scroll restoration. With Lenis smooth-scrolling, the browser's
// default "auto" restoration snapshots an in-between position when the page is
// reloaded mid-inertia, so the page reopens scrolled to a random section. We
// restore to the top (or to an explicit #hash deep-link) instead — predictable.
const scrollInitScript = `(function(){try{if("scrollRestoration" in history){history.scrollRestoration="manual"}if(!location.hash){window.scrollTo(0,0)}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${marcellus.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: scrollInitScript }} />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <Providers>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <FloatingWhatsapp />
        </Providers>
      </body>
    </html>
  );
}
