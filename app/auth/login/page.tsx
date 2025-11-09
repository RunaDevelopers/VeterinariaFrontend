import { AuthSwitcher } from "@/components/auth/AuthSwitcher";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      {/* Lado izquierdo con gradiente */}
      <div className="hidden lg:flex lg:w-1/2 bg-cyan-400 items-center justify-center p-20">
        <div className="text-white">
          <h1 className="text-6xl font-bold mb-4">vetPet</h1>
        </div>
      </div>

      {/* Lado derecho con formulario */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-white">
        <AuthSwitcher />
      </div>
    </div>
  );
}