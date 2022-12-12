import useLocalStorage from "./Hooks/useLocalStorage"

export const functionExit = async () => {
    // Se limpia el LocalStorage
    await useLocalStorage.Clear();

    return true;
}