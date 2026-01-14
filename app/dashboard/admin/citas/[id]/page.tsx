"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Dog,
  FileText,
  Stethoscope,
  Syringe,
  Activity,
  FileDown,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

// Modal para ver PDFs
function PDFViewerModal({ isOpen, onClose, pdfUrl, title }: { 
  isOpen: boolean; 
  onClose: () => void; 
  pdfUrl: string; 
  title: string; 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl h-[90vh] bg-surface rounded-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-borderColor bg-background">
          <h3 className="text-lg font-semibold text-textPrimary">{title}</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(pdfUrl, '_blank')}
            >
              <FileDown className="h-4 w-4 mr-2" />
              Descargar
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
        <iframe
          src={pdfUrl}
          className="w-full h-full"
          title={title}
        />
      </div>
    </div>
  );
}

// Modal para ver Historial Médico Completo
function HistorialMedicoModal({ 
  isOpen, 
  onClose, 
  historial,
  mascotaNombre,
  onViewPDF
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  historial: any[];
  mascotaNombre: string;
  onViewPDF: (url: string, title: string) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-surface rounded-lg shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-borderColor bg-background">
          <div>
            <h3 className="text-xl font-semibold text-textPrimary">Historial Médico Completo</h3>
            <p className="text-sm text-textSecondary mt-1">{mascotaNombre} - {historial.length} registros</p>
          </div>
          <Button variant="outline" size="icon" onClick={onClose}>
            ✕
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {historial.map((registro) => (
            <Collapsible key={registro.id}>
              <CollapsibleTrigger asChild>
                <button className="w-full p-4 rounded-lg border border-borderColor bg-background hover:bg-background/80 transition flex items-center justify-between text-left">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <ChevronDown className="h-4 w-4 text-primary flex-shrink-0 transition-transform data-[state=open]:rotate-180" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={
                          registro.tipo === "Cirugía" ? "bg-error text-white" :
                          registro.tipo === "Vacunación" ? "bg-secondary text-white" :
                          "bg-primary text-white"
                        }>
                          {registro.tipo}
                        </Badge>
                        <span className="text-sm text-textSecondary">
                          {new Date(registro.fecha).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      <p className="font-medium text-textPrimary text-sm mt-2">
                        {registro.diagnostico}
                      </p>
                    </div>
                  </div>
                </button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-2 ml-8 space-y-3 border-l-2 border-primary pl-4 pb-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-textSecondary font-medium mb-1">Veterinario</p>
                    <p className="text-textPrimary flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-primary" />
                      {registro.veterinario}
                    </p>
                  </div>

                  <div>
                    <p className="text-textSecondary font-medium mb-1">Tratamiento</p>
                    <p className="text-textPrimary">{registro.tratamiento}</p>
                  </div>

                  {registro.medicamentos && (
                    <div>
                      <p className="text-textSecondary font-medium mb-1">Medicamentos</p>
                      <p className="text-textPrimary">{registro.medicamentos}</p>
                    </div>
                  )}

                  {registro.observaciones && (
                    <div>
                      <p className="text-textSecondary font-medium mb-1">Observaciones</p>
                      <p className="text-textPrimary">{registro.observaciones}</p>
                    </div>
                  )}
                </div>

                <Button
                  size="sm"
                  onClick={() => onViewPDF(registro.pdfUrl, `${registro.tipo} - ${registro.fecha}`)}
                  className="w-full bg-accent hover:bg-accent/90 text-white"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Ver PDF
                </Button>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CitaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [pdfModal, setPdfModal] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: "",
    title: ""
  });
  const [historialModal, setHistorialModal] = useState(false);

  // Datos de ejemplo - Reemplazar con API call
  const citaData = {
    id: params.id,
    fecha: "2026-01-13",
    hora: "09:00",
    tipo: "Consulta General",
    estado: "Confirmada",
    motivo: "Revisión rutinaria y vacunación",
    veterinario: "Dr. Juan Pérez",
    cliente: {
      id: "1",
      nombre: "María González",
      email: "maria.gonzalez@email.com",
      telefono: "+34 612 345 678",
      direccion: "Calle Principal 123, Madrid"
    },
    mascota: {
      id: "1",
      nombre: "Max",
      especie: "Perro",
      raza: "Golden Retriever",
      edad: "3 años",
      peso: "28 kg",
      sexo: "Macho",
      color: "Dorado",
      foto: "https://res.cloudinary.com/dbgnyc842/image/upload/v1725399957/xmlctujxukncr5eurliu.png"
    },
    historialMedico: [
      {
        id: "1",
        fecha: "2025-12-15",
        tipo: "Consulta",
        diagnostico: "Revisión general - Estado saludable",
        veterinario: "Dra. Ana Martínez",
        tratamiento: "Ninguno requerido",
        proximaCita: "2026-03-15",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      },
      {
        id: "2",
        fecha: "2025-10-10",
        tipo: "Vacunación",
        diagnostico: "Vacuna antirrábica anual",
        veterinario: "Dr. Juan Pérez",
        tratamiento: "Vacuna aplicada correctamente",
        observaciones: "Próxima dosis en 12 meses",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      },
      {
        id: "3",
        fecha: "2025-08-20",
        tipo: "Cirugía",
        diagnostico: "Esterilización",
        veterinario: "Dr. Juan Pérez",
        tratamiento: "Cirugía exitosa, recuperación normal",
        observaciones: "Control post-operatorio a los 10 días",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      },
      {
        id: "4",
        fecha: "2025-06-05",
        tipo: "Consulta",
        diagnostico: "Infección de oído",
        veterinario: "Dra. Ana Martínez",
        tratamiento: "Antibióticos por 7 días",
        medicamentos: "Amoxicilina 500mg cada 12 horas",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      }
    ]
  };

  const handleViewPDF = (url: string, title: string) => {
    setPdfModal({ isOpen: true, url, title });
  };

  return (
    <div className="space-y-6 p-4 min-h-screen">
      {/* Header con botón volver */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="h-10 w-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 flex items-center gap-4">
          <h1 className="text-3xl font-bold text-textPrimary">Detalle de Cita</h1>
          <p className="text-textSecondary mt-1">
            {new Date(citaData.fecha).toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Badge className={
          citaData.estado === "Confirmada" 
            ? "bg-secondary text-white" 
            : "bg-warning text-white"
        }>
          {citaData.estado}
        </Badge>
      </div>

      {/* Grid 3 columnas - Resumen rápido */}
      <div className="grid gap-4 lg:grid-cols-3">
        
        {/* Card Cliente */}
        <Card className="border-borderColor bg-surface">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-textPrimary">
              <User className="h-5 w-5 text-primary" />
              Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pb-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white font-semibold text-xl flex-shrink-0 mb-2">
                {citaData.cliente.nombre.split(' ').map(n => n[0]).join('')}
              </div>
              <p className="font-semibold text-textPrimary text-base">{citaData.cliente.nombre}</p>
              <p className="text-sm text-textSecondary">ID: #{citaData.cliente.id}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-borderColor pt-2 text-sm">
              <div className="flex flex-col items-center justify-center p-2 rounded bg-background">
                <Mail className="h-4 w-4 mb-1 text-primary" />
                <p className="text-textPrimary text-xs truncate w-full text-center">{citaData.cliente.email}</p>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded bg-background">
                <Phone className="h-4 w-4 mb-1 text-primary" />
                <p className="text-textPrimary text-xs">{citaData.cliente.telefono}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Mascota */}
        <Card className="border-borderColor bg-surface">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-textPrimary">
              <Dog className="h-5 w-5 text-accent" />
              Mascota
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pb-4">
            <div className="flex flex-col items-center text-center">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-accent flex-shrink-0 mb-2">
                <img
                  src={citaData.mascota.foto}
                  alt={citaData.mascota.nombre}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="font-semibold text-textPrimary text-base">{citaData.mascota.nombre}</p>
              <p className="text-sm text-textSecondary">{citaData.mascota.raza}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-borderColor pt-2">
              <div className="text-center p-2 rounded bg-background">
                <p className="text-xs text-textSecondary">Edad</p>
                <p className="font-semibold text-textPrimary text-base">{citaData.mascota.edad}</p>
              </div>
              <div className="text-center p-2 rounded bg-background">
                <p className="text-xs text-textSecondary">Peso</p>
                <p className="font-semibold text-textPrimary text-base">{citaData.mascota.peso}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Cita Médica */}
        <Card className="border-borderColor bg-surface">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm text-textPrimary">
              <Calendar className="h-4 w-4 text-primary" />
              Cita Médica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-textSecondary mb-1 font-medium">Fecha y Hora</p>
              <p className="font-semibold text-textPrimary text-sm">
                {new Date(citaData.fecha).toLocaleDateString('es-ES')}
              </p>
              <p className="text-sm text-textSecondary">{citaData.hora}</p>
            </div>
            <div className="border-t border-borderColor pt-2 space-y-2">
              <div>
                <p className="text-xs text-textSecondary mb-1 font-medium">Tipo</p>
                <Badge className="bg-primary text-white text-xs font-semibold">{citaData.tipo}</Badge>
              </div>
              <div>
                <p className="text-xs text-textSecondary mb-1 font-medium">Veterinario</p>
                <p className="font-semibold text-textPrimary text-sm flex items-center gap-1">
                  <Stethoscope className="h-3 w-3 text-accent" />
                  {citaData.veterinario}
                </p>
              </div>
              <div className="border-t border-borderColor pt-2">
                <p className="text-xs text-textSecondary mb-1 font-medium">Motivo</p>
                <p className="text-sm text-textPrimary">{citaData.motivo}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historial Médico Prominente */}
      <Card className="border-borderColor bg-surface">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-textPrimary">
              <Activity className="h-5 w-5 text-accent" />
              Historial Médico de {citaData.mascota.nombre}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHistorialModal(true)}
              className="border-accent text-accent hover:bg-accent/10"
            >
              Ver todos ({citaData.historialMedico.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {citaData.historialMedico.length > 0 && (
            <Collapsible defaultOpen={true}>
              <CollapsibleTrigger asChild>
                <button className="w-full p-3 rounded-lg border border-borderColor bg-background hover:bg-background/80 transition flex items-center justify-between text-left">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <ChevronDown className="h-5 w-5 text-primary flex-shrink-0 transition-transform data-[state=open]:rotate-180" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <Badge className={
                          citaData.historialMedico[0].tipo === "Cirugía" ? "bg-error text-white" :
                          citaData.historialMedico[0].tipo === "Vacunación" ? "bg-secondary text-white" :
                          "bg-primary text-white"
                        }>
                          {citaData.historialMedico[0].tipo}
                        </Badge>
                        <span className="text-sm text-textSecondary font-medium">
                          {new Date(citaData.historialMedico[0].fecha).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      <p className="font-semibold text-textPrimary text-base">
                        {citaData.historialMedico[0].diagnostico}
                      </p>
                      <p className="text-sm text-textSecondary mt-1">
                        Por {citaData.historialMedico[0].veterinario}
                      </p>
                    </div>
                  </div>
                </button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-2 ml-6 space-y-2 border-l-2 border-accent pl-3 pb-3">
                <div className="space-y-2 text-xs">
                  <div>
                    <p className="text-textSecondary font-semibold mb-1">Diagnóstico</p>
                    <p className="text-textPrimary bg-background p-2 rounded">{citaData.historialMedico[0].diagnostico}</p>
                  </div>

                  <div>
                    <p className="text-textSecondary font-semibold mb-1">Tratamiento</p>
                    <p className="text-textPrimary bg-background p-2 rounded">{citaData.historialMedico[0].tratamiento}</p>
                  </div>

                  {citaData.historialMedico[0].medicamentos && (
                    <div>
                      <p className="text-textSecondary font-semibold mb-1">Medicamentos Prescritos</p>
                      <p className="text-textPrimary bg-background p-2 rounded">{citaData.historialMedico[0].medicamentos}</p>
                    </div>
                  )}

                  {citaData.historialMedico[0].observaciones && (
                    <div>
                      <p className="text-textSecondary font-semibold mb-1">Observaciones</p>
                      <p className="text-textPrimary bg-background p-2 rounded">{citaData.historialMedico[0].observaciones}</p>
                    </div>
                  )}
                </div>

                <Button
                  size="sm"
                  onClick={() => handleViewPDF(citaData.historialMedico[0].pdfUrl, `${citaData.historialMedico[0].tipo} - ${citaData.historialMedico[0].fecha}`)}
                  className="w-full bg-accent hover:bg-accent/90 text-white text-xs py-1"
                >
                  <FileText className="h-3 w-3 mr-2" />
                  Ver PDF Completo
                </Button>
              </CollapsibleContent>
            </Collapsible>
          )}
        </CardContent>
      </Card>

      {/* Modal para ver PDFs */}
      <PDFViewerModal
        isOpen={pdfModal.isOpen}
        onClose={() => setPdfModal({ isOpen: false, url: "", title: "" })}
        pdfUrl={pdfModal.url}
        title={pdfModal.title}
      />

      {/* Modal para ver Historial Médico Completo */}
      <HistorialMedicoModal
        isOpen={historialModal}
        onClose={() => setHistorialModal(false)}
        historial={citaData.historialMedico}
        mascotaNombre={citaData.mascota.nombre}
        onViewPDF={handleViewPDF}
      />
    </div>
  );
}
