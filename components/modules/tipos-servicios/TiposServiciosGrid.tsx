import { TipoServicio } from "@/types/tipo-servicio.interface"

interface Props {
    tiposServicios: TipoServicio[];
}

export const TiposServiciosGrid = ( { tiposServicios }: Props) => {
  return (
    <div>TiposServiciosGrid</div>
  )
}
