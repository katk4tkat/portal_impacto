import { searchTechnicalUnit } from "./firebase";

export const loadOptions = async (inputValue) => {
  try {
    const units = await searchTechnicalUnit(inputValue);
    const uniqueUnits = [...new Set(units)];
    return uniqueUnits.map((suggestion) => ({
      value: suggestion,
      label: suggestion,
    }));
  } catch (error) {
    console.error("Error al buscar sugerencias de unidad técnica:", error);
    return [];
  }
};
