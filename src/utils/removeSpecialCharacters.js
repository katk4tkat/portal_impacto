function removeSpecialCharacters(inputString = "") {
    return inputString.replace(/[^\p{L}\d\s]/gu, '').normalize("NFD").replace(/\p{Diacritic}/gu, '');
}

export { removeSpecialCharacters }