
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginApi(credentials: { username: string; password: string }) {
  // El login no requiere token (requiresAuth: false)
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
    if (!response.ok) {
    throw new Error("Error al iniciar sesión");
    }
    return response.json();
}
