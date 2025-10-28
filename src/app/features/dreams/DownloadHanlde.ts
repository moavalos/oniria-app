export function suggestFilename(url: string, fallback: string) {
    try {
        const u = new URL(url);
        const pathname = u.pathname.split("/").pop() || "";
        const clean = pathname.split("?")[0] || "";
        if (clean) return clean;
    } catch (error) {
        console.error("error:", error);
    }
    return `${fallback.replace(/[^\w-]+/g, "_").toLowerCase() || "dream"}.jpg`;
}

export async function downloadUrlAsFile(url: string, filename: string) {
    // url y descarga directa de un archivo (puede ser data: o blob: o http(s): )
    if (url.startsWith("data:")) {
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        return;
    }

    // fetch y ObjectURL (requiere CORS habilitado en el host)
    try {
        const res = await fetch(url, { credentials: "omit", cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = objectUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();

        // liberar memoria
        setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
        return;
    } catch (error) {
        console.error("error:", error);
        // fallback sin CORS: abrir en nueva pestaña para que el user guarde manualmente
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
}