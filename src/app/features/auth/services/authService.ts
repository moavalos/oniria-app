const API_URL = "http://localhost:3000/api/auth";
// ⚠️ más adelante esto debería salir de import.meta.env.VITE_API_URL

export async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Error al iniciar sesión");
    }

    return res.json(); // debería devolver { token, user }
}

export async function register(
    nombre: string,
    email: string,
    telefono: string,
    password: string
) {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono, password }),
    });

    if (!res.ok) {
        throw new Error("Error al registrarse");
    }

    return res.json();
}
