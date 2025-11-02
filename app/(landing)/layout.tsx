import { Navbar } from "@/components/shared";

export default function LandingLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}