export type UserData = {
    name: string;
    email: string;
};

const USERS_URL = "usuarios.json";

export async function fetchUsers(signal?: AbortSignal): Promise<UserData[]> {
    const res = await fetch(USERS_URL, { signal });
    if (!res.ok) throw new Error(`Error al cargar los usuarios: ${res.status}`);
    const data = await res.json();
    return data.users || [];
}

export async function fetchUserByEmail(email: string, signal?: AbortSignal): Promise<UserData | undefined> {
    const users = await fetchUsers(signal);
    return users.find((u) => u.email === email);
}
