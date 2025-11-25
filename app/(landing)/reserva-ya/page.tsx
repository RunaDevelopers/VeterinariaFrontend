
import { ReservaYaForm } from "@/components/modules/reserva-ya/ReservaYaForm";

export const metadata = {
 title: 'Reserva Ya!',
 description: 'Solicita una reserva para nuestros servicios veterinarios de manera rápida y sencilla',
};

export default function ReservaYaPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Reserva Ya!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Solicita una reserva para nuestros servicios veterinarios de manera rápida y sencilla.
            Completa el formulario y nos pondremos en contacto contigo para confirmar los detalles.
          </p>
        </div>

        <ReservaYaForm />
      </div>
    </div>
  );
}