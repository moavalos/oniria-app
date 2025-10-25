export type BadgeData = {
    name: string;
    title: string;
    icon: string;
    description: string;
    xOffset: number;
    yOffset: number;
    zOffset: number;
};


export const objectsDescriptions = [
    {
        name: "portal",
        title: "El Portal",
        icon: "portal",
        description:
            "Aquí podrás registrar tus sueños, explorar tu historia y descubrir los patrones que habitan en tu mente.”",
        xOffset: 1.5,
        yOffset: 0.1,
        zOffset: 0,
    },
    {
        name: "monitor",
        title: "Centro de Control",
        icon: "settings",
        description:
            "Aquí podrás ajustar las configuraciones de tu experiencia onírica y personalizar tu viaje a través del mundo de Oniria.",
        xOffset: 0,
        yOffset: 0.2,
        zOffset: 1.5,
    },
];