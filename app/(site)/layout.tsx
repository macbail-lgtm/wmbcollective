import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// Shared chrome (sticky nav + footer) for every inner page. The landing
// page lives outside this route group so it stays nav-free per spec.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
