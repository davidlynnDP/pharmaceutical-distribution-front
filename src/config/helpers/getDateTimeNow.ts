


export const getDateTimeNow = (): string => {

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES', {
        weekday: 'long',  // Nombre del día de la semana
        day: 'numeric',   // Día del mes
        month: 'long',    // Nombre del mes
        year: 'numeric',  // Año
        hour: 'numeric',  // Hora (en formato de 12 horas)
        minute: 'numeric',  // Minuto
        hour12: true,     // Usar formato de 12 horas (am/pm)
    });

    return formattedDate;

}

