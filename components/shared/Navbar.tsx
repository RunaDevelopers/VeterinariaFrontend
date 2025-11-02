import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export const Navbar = () => {

  const routes = [
    { name: "Nosotros", path: "/nosotros" },
    { name: "Servicios", path: "/servicios" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <>
      <header className="flex items-center justify-between py-6 px-8 max-w-7xl mx-auto">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/logo.webp"
            alt="Logo de vetPet"
            width={50}
            height={50}
            className="object-contain"
          />
          <span className="text-xl">vetPet</span>
        </Link>
        <nav className="flex gap-3 p-3 bg-cyan-500 rounded-lg">
          {routes.map((route) => (
            <Link key={route.name} href={route.path} 
              className="text-lg bg-white rounded-sm py-3 px-12 font-bold">
              {route.name}
            </Link>
          ))}
        </nav>
        <Button>Iniciar Sesión</Button>
      </header>
    </>
  );
};
