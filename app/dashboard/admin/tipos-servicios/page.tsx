import { Header } from "@/components/custom/Header";
import { getTiposServicio } from "@/lib/api/tipo-servicios";
import { TipoServicioCard } from "@/components/modules/tipos-servicios/TipoServicioCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata = {
 title: 'Tipos de Servicios',
 description: 'Administración de Tipos de Servicios',
};

export default async function TiposServiciosPage() {

  const tiposServicios = await getTiposServicio();

  return (
    <div>
      <Header
        title="Tipos de Servicios"
        description="Administración de Tipos de Servicios"
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Tipo de Servicio
        </Button>
      </Header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tiposServicios.map((tipo) => (
          <TipoServicioCard
            key={tipo.idTipoServicio}
            tipoServicio={tipo}
          />
        ))}
      </div>

      {tiposServicios.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay tipos de servicios registrados</p>
        </div>
      )}
    </div>
  );
}