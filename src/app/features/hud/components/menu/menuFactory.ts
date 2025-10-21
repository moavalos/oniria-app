import type { MenuFactory } from "../../types/menu.types";


const menuFactory: MenuFactory = {
    portal: {
        title: "El Portal",
        description: "El Portal de los Sueños es el punto de acceso a tu universo interior. Desde aquí podés registrar un sueño, interpretarlo o explorar tu historia onírica. Cada elección abre un nuevo camino dentro de tu mente.",
        icon: undefined,
        items: [
            {
                label: "¿Qué soñaste?",
                icon: "dreamJournal",
                description: "Oniria AI te dará una interpretación simbólica de tu sueño. ",
                action: () => { }
            }, {
                label: "Mi historia onírica",
                icon: "nodeJournal",
                description: "Accede a tu diario de sueños y explora las interpretaciones pasadas.",
                action: () => { }
            }
        ]
    },
}

export default menuFactory;