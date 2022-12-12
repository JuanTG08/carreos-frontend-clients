import React, { useEffect, useState } from "react";
import { Platform } from "react-native"
import {
    NativeBaseProvider,
    Box,
    Text,
    Icon,
    HStack,
    Center,
    Pressable,
} from "native-base";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons"
import { Login } from "../Components/LoginAndRegister/Login"
import { Register } from "../Components/LoginAndRegister/Register"
import useLocalStorage from "../Hooks/useLocalStorage";

const LoginScreen = ({propUser}) => {
    const [selected, setSelected] = useState(0);
    const [logEnd, setLogEnd] = useState(false);

    useEffect(async () => {
        const res = await useLocalStorage.getItem('@user');
        if (res && res.length > 0 && !logEnd) {
            const usuario = JSON.parse(res);
            loginEnd(usuario);
        }
    }, [logEnd])

    const loginEnd = (user) => {
        setLogEnd(user);
        propUser(true);
    }
    return (
        <NativeBaseProvider>
            {
                !logEnd ?
                <Center flex={1} px="3" mt="-5" bg={"#ffffff"}>
                    {
                        (selected === 0) ? <Login loginEnd={ loginEnd } /> : <Register />
                    }
                </Center>
                : <Text>{logEnd.fullname}</Text>
            }

            {
                !logEnd ?
                <Box bg="white" safeAreaTop>
                    <Center flex={1}></Center>
                    <HStack bg="indigo.500" alignItems="center" safeAreaBottom shadow={6}>
                        <Pressable
                            opacity={selected === 0 ? 1 : 0.5}
                            py="3"
                            flex={1}
                            onPress={() => setSelected(0)}>
                            <Center>
                                <Icon
                                    mb="1"
                                    as={
                                        <MaterialCommunityIcons
                                            name={selected === 0 ? 'login' : 'login'}
                                        />
                                    }
                                    color="white"
                                    size="sm"
                                />
                                <Text color="white" fontSize={ Platform.OS === "web" ? 20 : 13 }>
                                    Iniciar Sesion
                                </Text>
                            </Center>
                        </Pressable>
                        <Pressable
                            opacity={selected === 1 ? 1 : 0.5}
                            py="3"
                            flex={1}
                            onPress={() => setSelected(1)}>
                            <Center>
                                <Icon
                                    mb="1"
                                    as={
                                        <Feather
                                            name={selected === 1 ? 'user-plus' : 'user-plus'}
                                        />
                                    }
                                    color="white"
                                    size="sm"
                                />
                                <Text color="white" fontSize={ Platform.OS === "web" ? 20 : 13 }>
                                    Crear Cuenta
                                </Text>
                            </Center>
                        </Pressable>
                    </HStack>
                </Box>
                : false
            }
        </NativeBaseProvider>
    );
};

export default LoginScreen;
