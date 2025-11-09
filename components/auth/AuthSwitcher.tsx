"use client";

// Chavales, este componente es el que se encarga de alternar entre el formulario de login y el de registro
// Lo cree para no perder el server component de LoginPage

import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

// Componentes de animacion
import { ScaleIn } from "../animations";

export const AuthSwitcher = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => setShowLogin((prev) => !prev);

  return showLogin ? (
    <LoginForm onToggleForm={toggleForm} />
  ) : (
    <RegisterForm onToggleForm={toggleForm} />
  );
};
