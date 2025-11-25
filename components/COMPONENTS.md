# Componentes Personalizados

Este documento describe los componentes personalizados desarrollados para la aplicación de veterinaria.

## Header

Componente reutilizable para encabezados de página con acciones en el lado derecho.

### Props

- `title` (string, requerido): Título principal de la página
- `description` (string, opcional): Descripción debajo del título
- `children` (React.ReactNode, opcional): Botones o elementos de acción que se muestran en el lado derecho

### Ejemplo de uso básico

```tsx
import { Header } from "@/components/custom/Header";

<Header
  title="Usuarios"
  description="Gestión de usuarios del sistema"
/>
```

### Ejemplo con acciones

```tsx
import { Header } from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

<Header
  title="Usuarios"
  description="Gestión de usuarios del sistema"
>
  <Button variant="outline">
    <Download className="mr-2 h-4 w-4" />
    Exportar
  </Button>
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Nuevo Usuario
  </Button>
</Header>
```

### Características

- **Compacto**: Sin contenedor Card que ocupe espacio extra
- **Flexible**: Layout responsivo con acciones alineadas a la derecha
- **Simple**: Solo título, descripción opcional y acciones opcionales
- **Consistente**: Mantiene un diseño uniforme en toda la aplicación

### Estilos

- Layout flex con `justify-between` para separar título y acciones
- Título con `text-2xl font-bold tracking-tight`
- Descripción con `text-muted-foreground`
- Acciones con `flex items-center gap-2` y margen izquierdo
- Margen inferior de `mb-6` para separación con el contenido

## TipoServicioCard

Componente para mostrar información de un tipo de servicio en formato de tarjeta.

### Props

- `tipoServicio` (TipoServicio, requerido): Objeto con la información del tipo de servicio
- `onClick` (function, opcional): Función que se ejecuta al hacer click en la card

### Estructura

- **Imagen placeholder**: Aspect ratio 16:9 con icono de Stethoscope y gradiente azul
- **Título**: Nombre del servicio con límite de líneas
- **Badge de estado**: Muestra "Inactivo" si el servicio no está activo
- **Categoría**: Badge opcional para la categoría del servicio
- **Descripción**: Texto descriptivo con límite de líneas
- **Detalles**: Duración estimada y precio base con iconos
- **Badges informativos**: "Requiere cita" y "Veterinario" según corresponda

### Características

- **Visual atractivo**: Usa Card de shadcn/ui con hover effects
- **Aspect ratio**: Imagen placeholder con proporción 16:9
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Accesible**: Estados visuales claros para servicios inactivos
- **Información completa**: Muestra todos los detalles relevantes del servicio

### Estilos

- Card con `hover:shadow-lg` para efecto visual
- Aspect ratio con gradiente azul y icono centrado
- Badges para categorías y estados
- Iconos de Lucide React para duración, precio y características
- Opacidad reducida para servicios inactivos