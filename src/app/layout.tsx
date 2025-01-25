import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Cosiva",
  description:
    "Cosiva is dedicated to teaching kids coding through fun, hands-on projects, while preparing them for the future with concepts like AI and other emerging technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
        >

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
