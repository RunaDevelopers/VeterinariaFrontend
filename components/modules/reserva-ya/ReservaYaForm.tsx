"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { leadSchema } from "@/schemas/lead.schema";
import { TipoServicio } from "@/types/tipo-servicio.interface";
import { toast } from "sonner";
import { createLead } from "@/services/lead.service";

type LeadFormData = z.infer<typeof leadSchema>;

interface ReservaYaFormProps {
  tiposServicio: TipoServicio[];
  onSubmit?: (data: LeadFormData) => void;
  isLoading?: boolean;
}

export function ReservaYaForm({
  tiposServicio,
  onSubmit,
  isLoading = false,
}: ReservaYaFormProps) {
  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      telefono: "",
      correo: "",
      fechaTentativa: undefined,
      idTipoServicios: "",
    },
  });

  const handleSubmit = async (data: LeadFormData) => {
    try {
      const payload = {
        ...data,
        fechaTentativa: data.fechaTentativa
          ? format(data.fechaTentativa, "yyyy-MM-dd")
          : undefined,
      };
      await createLead(payload as any); // Cast to any because createLead expects inferred type which has Date
      toast.success("Solicitud enviada con éxito");
      form.reset();
      if (onSubmit) {
        onSubmit(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar la solicitud");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa tus nombres" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apellidos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa tus apellidos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa tu teléfono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Ingresa tu correo electrónico"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="idTipoServicios"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Servicio</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo de servicio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tiposServicio.map((tipo) => (
                        <SelectItem
                          key={tipo.idTipoServicio}
                          value={tipo.idTipoServicio}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {tipo.nombreServicio}
                            </span>
                            {tipo.descripcion && (
                              <span className="text-sm text-muted-foreground">
                                {tipo.descripcion}
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fechaTentativa"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha Tentativa</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Solicitar Reserva"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
