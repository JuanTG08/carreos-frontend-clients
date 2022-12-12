import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Platform } from "react-native";
import {
    Box,
    Text,
    Icon,
    HStack,
    Center,
    Pressable,
} from "native-base";
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";

const Menubottom = ({ func }) => {
    const [selected, setSelected] = useState(1);
    const options = [
        {
            title: "Home",
            symbol: "home",
            symbolSub: "home-outline",
            family: "MaterialCommunityIcons",
            position: 1,
            funcionality: "Home",
            select: true
        }, {
            title: "Registro",
            symbol: "history",
            symbolSub: "history",
            family: "FontAwesome5",
            position: 2,
            funcionality: "Log",
            select: true
        }, {
            title: "Tu Cuenta",
            symbol: "account",
            symbolSub: "account-outline",
            family: "MaterialCommunityIcons",
            position: 3,
            funcionality: "MyCount",
            select: true
        }, {
            title: "Salir",
            symbol: "exit-outline",
            symbolSub: "exit-outline",
            family: "Ionicons",
            position: 4,
            funcionality: "Out",
            select: false
        },
    ];

    const selectBottoms = (pos, fun, status) => {
        if (pos !== selected) {
            if (status) {
                setSelected(pos);
            }
            func(fun);
        }
    }

    const buttonOptions = () => {
        const render = (option, ind) => {
            return (
                <Pressable
                    opacity={selected === option.position ? 1 : 0.5}
                    py="3"
                    flex={1}
                    onPress={() => selectBottoms(option.position, option.funcionality, option.select)}
                >
                    <Center>
                        <Icon
                            mb="1"
                            as={
                                option.family === "MaterialCommunityIcons" ?
                                <MaterialCommunityIcons
                                    name={selected === ind ? option.symbol : option.symbolSub}
                                /> : option.family === "Ionicons" ?
                                <Ionicons
                                    name={selected === ind ? option.symbol : option.symbolSub}
                                /> :
                                <FontAwesome5
                                    name={selected === ind ? option.symbol : option.symbolSub}
                                />
                            }
                            color="white"
                            size="sm"
                        />
                        <Text color="white" fontSize={Platform.OS === "web" ? 20 : 13}>
                            { option.title }
                        </Text>
                    </Center>
                </Pressable>
            );
        }
        return (
            <HStack bg="indigo.500" alignItems="center" safeAreaBottom shadow={6} m="0">
                {
                    options.map((option, ind) => {
                        return (render(option,ind));
                    })
                }
            </HStack>
        );
    }

    return (
        <Box bg="white">
            <Center flex={1}></Center>
            {buttonOptions()}
        </Box>
    );
};

const styles = StyleSheet.create({});

export default Menubottom;
