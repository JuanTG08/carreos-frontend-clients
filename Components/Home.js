import React, { useState } from 'react';
import { Box, Center, NativeBaseProvider, Text } from 'native-base';
import Menubottom from './Home/MenuBottom';
import useLocalStorage from '../Hooks/useLocalStorage';
import DialogAlerts from './Layouts/DialogAlerts';
import Index from './Home/Index';

const Home = ({ propUser }) => {
    const [iGoOut, setIGoOut] = useState(false);
    const [navigation, setNavigation] = useState("Home");

    const getOut = async () => {
        await useLocalStorage.Clear();
        propUser(false)
    }

    const alertOut = () => {
        return <DialogAlerts title="Salir" text="¿Deseas Salir?" btn1="Cancelar" btn2="Salir" func={ getOut } />
    }

    const func = (e) => {
        setIGoOut(false);
        if (e === "Home") {
            setNavigation("Home")
        }else if (e === "Out") {
            setIGoOut(true);
        }
    }

    // Navegacion de la App
    const NavigationApp = () => {
        let Nav = <Index />; // Se crea una variable que sea predeterminada en el Inicio
        switch (navigation) {
            // Se redirige al Inicio
            case "Home":
                Nav = <Index />; 
                break;
            case "Registro":
                Nav = <Index />; 
                break;
            default:
                Nav = <Index />; 
                // Se redirige al Inicio
                break;
        }
        return <Index />;
    }

    return (
        <NativeBaseProvider>
            {
                iGoOut ? alertOut() : false
            }
            { NavigationApp() }
            <Box flex={1}></Box>
            <Menubottom func={ func } />
        </NativeBaseProvider>
    );
}
export default Home;
