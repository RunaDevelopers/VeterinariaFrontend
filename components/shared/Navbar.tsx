import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Navlink } from "./Navlink";

export const Navbar = () => {
  const routes = [
    { name: "Inicio", path: "/inicio" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Servicios", path: "/servicios" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <>
      <header className="flex items-center justify-between py-6 px-8 container mx-auto">
        <Link href="/inicio" className="flex gap-2 items-center">
          <span className="text-3xl font-bold">VetPet</span>
        </Link>
        <nav className="flex gap-3 p-2 bg-cyan-400 rounded-lg">
          {routes.map((route) => (
            <Navlink key={route.name} route={route} />
          ))}
        </nav>
        <Link href="/auth/login">
          <Button variant={"primary"}>Iniciar Sesión</Button>
        </Link>
      </header>
    </>
  );
};
