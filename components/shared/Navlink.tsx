"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  name: string;
  path: string;
}

export const Navlink = ({ route }: { route: Props }) => {
  const pathname = usePathname();

  return (
    <Link
      key={route.name}
      href={route.path}
      className={`text-lg rounded-sm py-1 px-12 font-bold hover:bg-white transition-all duration-100 ${pathname === route.path ? "bg-white" : ""}`}
    >
      {route.name}
    </Link>
  );
};
