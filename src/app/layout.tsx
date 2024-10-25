import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/core/providers/theme-provider";
import { AuthProvider } from "@/core/providers/auth.provider";
import { Toaster } from "@/components/ui/sonner";
import queryClient from "@/core/infrastructure/react-query/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "RentCard",
  description: "Gestiona tus rentas de automóvil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider client={queryClient}>
            <Toaster position="top-right" closeButton={true} />
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
