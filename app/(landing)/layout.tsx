import { Navbar } from "@/components/shared";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto">{children}</main>
    </div>
  );
}
