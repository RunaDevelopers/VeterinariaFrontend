export default function AdminDashboardPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard del Admin</h1>
        <p className="text-muted-foreground">
          Bienvenido a tu panel de admin
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Mis Mascotas</h3>
          <p className="text-sm text-muted-foreground">
            Gestiona la información de tus mascotas
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Mis Citas</h3>
          <p className="text-sm text-muted-foreground">
            Ver y agendar citas médicas
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Mi Perfil</h3>
          <p className="text-sm text-muted-foreground">
            Actualiza tu información personal
          </p>
        </div>
      </div>
    </div>
  );
}
