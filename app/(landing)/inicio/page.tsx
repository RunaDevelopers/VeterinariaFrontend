import { FadeIn } from "@/components/animations";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "vetPet",
  description: "Pagina de inicio de vetPet",
};

export default function InicioPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-20">
      <div className="space-y-5">
        <div className="flex flex-col gap-5">
          <h1 className="text-5xl font-bold">
            <p>El bienestar de tu</p>
            <p>
              mascota empieza <span className="text-cyan-400">aquí.</span>
            </p>
          </h1>
          <Link
            href="/auth/register"
            className="inline-block bg-cyan-400 text-white text-4xl font-bold text-center px-6 py-3 rounded-md hover:bg-cyan-500 transition"
          >
            ¡Reserva Ya!
          </Link>
        </div>
        <div className="grid grid-cols-2 grid-rows-3 gap-x-10 gap-y-5 mt-10 md:mt-20">
          <div className="flex flex-col text-5xl font-bold col-start-1 row-start-1">
            <p className="text-black">+ 10 años</p>
            <span className="text-cyan-400 text-4xl">de experiencia</span>
          </div>
          <div className="flex flex-col text-5xl font-bold col-start-2 row-start-2">
            <p className="text-black">+ 500 familias</p>
            <span className="text-cyan-400 text-4xl">confían en nosotros</span>
          </div>
          <div className="flex flex-col text-5xl font-bold col-start-1 row-start-3">
            <p className="text-black">Tecnología</p>
            <span className="text-cyan-400 text-4xl">de vanguardia</span>
          </div>
        </div>
      </div>
      <Image
        className="mx-auto w-500"
        src="/img/perro3.png"
        alt="Descripción de la imagen"
        width={500}
        height={500}
      />
    </div>
  );
}
