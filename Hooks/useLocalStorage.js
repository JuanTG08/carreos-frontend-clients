import AsyncStorage from '@react-native-async-storage/async-storage';

const useLocalStorage = {};

useLocalStorage.setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        return true;
    }catch (err) {
        throw err;
    }
}

useLocalStorage.getItem = async (key) => {
    try {
        const res = await AsyncStorage.getItem(key);
        if (res !== null) {
            return res;
        }else {
            return false;
        }
    }catch (err) {
        throw err;
    }
}

useLocalStorage.getAll = async () => {
    try {
        const list = await AsyncStorage.getAllKeys();
        return (list.length === 0) ? false : list;
    }catch (err) {
        throw err;
    }
}

useLocalStorage.multiGet = async (keys) => {
    let response = false;
    try {
        const list = await AsyncStorage.multiGet();
        if (list) {
            response = list;
        }
    }catch (err) {
        throw err;
    }
    return response;
}

useLocalStorage.updateItem = async (key, value) => {
    return await useLocalStorage.setItem(key, value);
}

useLocalStorage.removeItem = async (key, value) => {
    try {
        await AsyncStorage.removeItem(key);
    }catch (err) {
        throw err;
    }
}

useLocalStorage.Clear = async () => {
    try {
        await AsyncStorage.clear();
    }catch (err) {
        throw err;
    }
}

export default useLocalStorage;