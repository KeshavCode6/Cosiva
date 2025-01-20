import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useFirebaseAuth";
import { FirestoreProvider } from "@/hooks/useFirestore";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // Adjust weights as needed
});

export const metadata: Metadata = {
  title: "Cosiva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" sizes="any" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <FirestoreProvider>
            <AuthProvider>{children}</AuthProvider>
          </FirestoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
