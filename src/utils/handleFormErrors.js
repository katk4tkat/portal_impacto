//expresión regular para validar si la semana es válida o está vacía

const isWeekValid = (week) => {
    if (week === '') {
        return true;
    }

    const regex = /^\d{4}-\d{2}$/;
    return regex.test(week);
};

//expresión regular para validar si la semana es válida
const isRequiredWeekValid = (week) => {
    const regex = /^\d{4}-\d{2}$/;
    return regex.test(week);
};

export { isWeekValid, isRequiredWeekValid }
