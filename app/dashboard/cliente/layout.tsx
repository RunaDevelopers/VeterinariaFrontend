"use client";

import { RoleGuard } from "@/components/auth/RoleGuard";
import { UserRole } from "@/lib/constants/roles";

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={[UserRole.CLIENTE]}>
      {children}
    </RoleGuard>
  );
}
