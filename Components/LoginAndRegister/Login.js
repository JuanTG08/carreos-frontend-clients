import React, { useState } from 'react'
import { useViewPassword } from '../../Hooks/useViewPassword'
import { useValidateMail } from '../../Hooks/useValidateMail'
import { apiLogin } from '../../api'
import {
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    Icon,
    WarningOutlineIcon,
    ScrollView,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons"
import useLocalStorage from "../../Hooks/useLocalStorage"
import AlertView from '../Layouts/AlertView';

export const Login = ({ loginEnd }) => {
    // State para cambiar el input password
    const [view, setView] = useState(false);
    // State para guardar los datos
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    // State para la verificacion final
    const [verifyMail, setVerifyMail] = useState(true);
    const [verifyPassword, setVerifyPassword] = useState(true);
    // State para mensajes de error
    const [messageError, setMessageError] = useState(false);
    const [messageErrorPass, setMessageErrorPass] = useState(false);

    const [alertError, setAlertError] = useState(false);

    const validateInfo = async () => {
        // Informacion del Mail
        if (mail && mail.length > 0) {
            if (useValidateMail(mail)) {
                setVerifyMail(false)
                setMessageError("Email invalido");
            }else {
                setVerifyMail("nice")
            }
        }else {
            setVerifyMail(false)
            setMessageError("Campo en Blanco");
        }
        // Informacion de la contraseña
        if (password && password.length > 7) {
            setVerifyPassword("nice")
        }else {
            setVerifyPassword(false);
            setMessageErrorPass("La contraseña debe ser mayor o igual a 8 digitos.");
        }

        if (verifyMail === "nice" && verifyPassword === "nice") {
            const resp = await apiLogin(mail, password);
            if (resp) {
                useLocalStorage.setItem('@user', JSON.stringify(resp[0]));
                loginEnd(resp)
            }else {
                setAlertError(true);
            }
        }
    }
    
    const showAlert = (close = false) => {
        const timerClose = setTimeout(() => {
            setAlertError(false);
        }, 5000);
        if (!close) {
            timerClose;
            return (<AlertView status="warning" title="Correo o Contraseña Invalidos" close={ showAlert }/>);
        }
        setAlertError(false);
    }

    return (
        <Box safeArea p="0" py="8" w="100%" maxW="290">
            <ScrollView>
                <Heading
                    size="xl"
                    fontWeight="900"
                    color="indigo.500"
                    borderBottomColor="indigo.500"
                    borderBottomWidth="2"
                    padding="1"
                    _dark={{
                        color: "warmGray.50",
                    }}
                >
                    Iniciar Sesion
                </Heading>
                {
                    alertError ? showAlert() : false
                }
                <VStack space="3" mt="5">
                    <FormControl isInvalid={ verifyMail ? false : true }>
                        <FormControl.Label>Correo Electronico</FormControl.Label>
                        <Input
                            placeholder="example@gmail.com"
                            _focus={{ borderColor: (verifyMail ? "indigo.500" : "red.500"), borderWidth: 1 }}
                            onChangeText={e => setMail(e)}
                            value={ mail }
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            { messageError ? messageError : "" }
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={ verifyPassword ? false : true }>
                        <FormControl.Label>Contraseña</FormControl.Label>
                        <Input
                            type={!view ? "password" : ""}
                            placeholder="********"
                            _focus={{ borderColor: "indigo.500", borderWidth: 1 }}
                            onChangeText={ e => setPassword(e)}
                            InputRightElement={
                                <Icon
                                    as={view ? <MaterialIcons name="visibility" /> : <MaterialIcons name="visibility-off" />}
                                    size={5}
                                    mr="2"
                                    color="muted.400"
                                    onPress={() => { setView(useViewPassword(view)) }}
                                    value={ password }
                                />
                            }
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            { messageErrorPass ? messageErrorPass : "" }
                        </FormControl.ErrorMessage>
                        <Link
                            _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "indigo.500",
                            }}
                            alignSelf="flex-end"
                            mt="1"
                        >
                            ¿Olvidaste tu Contraseña?
                        </Link>
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={() => {validateInfo()}}>
                        Ingresar
                    </Button>
                </VStack>
            </ScrollView>
        </Box>
    )
}
