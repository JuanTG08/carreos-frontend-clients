import { Box, NativeBaseProvider, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import Home from '../Components/Home';
import useLocalStorage from '../Hooks/useLocalStorage';
import LoginScreen from './LoginScreen';

const HomeScreen = () => {
    const [User, setUser] = useState(false);

    const getUser = async () => {
        const res = await useLocalStorage.getItem('@user');
        if (res && res.length > 0) {
            setUser(JSON.parse(res));
        }else {
            setUser(false);
        }
    }

    useEffect(async () => {
        if (!User) {
            getUser();
        }
    }, [User])

    const propUser = (ind) => {
        console.log("aca");
        if (ind) {
            getUser(true);
        }else {
            setUser(false);
        }
    }

    return (
        <NativeBaseProvider>
            <Box h="100%" bg="white">
                { User ? <Home propUser={propUser} /> : <LoginScreen propUser={propUser} />}
            </Box>
        </NativeBaseProvider>
    )
}

export default HomeScreen
