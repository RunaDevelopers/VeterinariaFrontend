
export const metadata = {
 title: 'vetPet | Login',
 description: 'Iniciar sesión o registrarse en la aplicación.',
};

import { AuthSwitcher } from "@/components/auth/AuthSwitcher";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Lado izquierdo con gradiente */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#FDF6EC] items-center justify-center p-20 relative z-10" style={{ boxShadow: '1px 0px 10px 0px rgba(0, 0, 0, 0.1)' }}>
        <div className="flex flex-col items-center">
          {/* Contenedor circular con la imagen del perrito */}
          <div className="relative w-80 h-80 mb-8">
            {/* Círculo de fondo azul perfectamente centrado */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full shadow-xl"></div>
            {/* Imagen del perrito centrada y sobresaliendo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="https://res.cloudinary.com/dtqvmh9te/image/upload/v1768360859/perrito_fgtu3s.webp"
                alt="Perrito VetPet"
                width={300}
                height={300}
                className="object-contain relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>
          {/* Texto vetPet */}
          <h1 className="text-6xl font-bold text-blue-600">vetPet</h1>
        </div>
      </div>

      {/* Lado derecho con formulario */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-white">
        <AuthSwitcher />
      </div>
    </div>
  );
}