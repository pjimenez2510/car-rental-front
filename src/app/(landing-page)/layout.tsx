import Footer from "@/core/layout/lading-page/footer";
import { Navbar } from "@/core/layout/lading-page/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full items-center gap-4">
      <Navbar />
      <main className="container flex-1 px-4">{children}</main>
      <Footer />
    </div>
  );
}
