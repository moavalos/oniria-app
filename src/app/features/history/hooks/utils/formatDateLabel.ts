export function formatDateLabel(isoDate: string): string {
    const date = new Date(isoDate);

    const diasSemana = [
        'domingo', 'lunes', 'martes', 'miércoles',
        'jueves', 'viernes', 'sábado'
    ];

    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const diaSemana = diasSemana[date.getDay()];
    const dia = date.getDate();
    const mes = meses[date.getMonth()];

    const horas = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    const segundos = date.getSeconds().toString().padStart(2, '0');

    return `${diaSemana} ${dia} de ${mes}, ${horas}:${minutos}:${segundos}`;
}