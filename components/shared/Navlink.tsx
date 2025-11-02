"use client"

import { usePathname } from "next/navigation"

export const Navlink = () => {

  const pathname = usePathname();

  return (
    <div>Navlink</div>
  )
}
