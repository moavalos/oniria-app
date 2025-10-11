import { useEffect, useState } from "react";
import Header from "./Header";
import { fetchUsers, type UserData } from "@/services/header/header.service";

export default function HeaderContainer() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const users = await fetchUsers(controller.signal);
                setUser(users[0]);
            } catch (err) {
                console.error("Error cargando usuario:", err);
            } finally {
                setLoading(false);
            }
        })();

        return () => controller.abort();
    }, []);

    return (
        <Header
            logoText="Oniria"
            userName={loading ? "Cargando..." : user?.name ?? "Invitado"}
            userEmail={loading ? "..." : user?.email ?? ""}
        />
    );
}
