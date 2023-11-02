//expresión regular para validar si la semana es válida
const isWeekValid = (week) => {
    const regex = /^\d{4}-W\d{2}$/;
    return regex.test(week);
};

export { isWeekValid }