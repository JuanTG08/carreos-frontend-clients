import React, { useEffect, useState } from 'react'
import {
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
    Icon,
    ScrollView,
    WarningOutlineIcon
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons"
import { useViewPassword } from '../../Hooks/useViewPassword'
import { useValidateMail } from '../../Hooks/useValidateMail'
import { apiCreateUser } from '../../api';
import AlertView from '../Layouts/AlertView';

export const Register = () => {
    const [view, setView] = useState(false);
    const [view2, setView2] = useState(false);

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [message, setMessage] = useState(false);

    const [userCreate, setUserCreate] = useState(false);

    useEffect(() => {
        console.log(message);
    }, [message]);

    const establecerState = (estate, mensage) => {
        setMessage(ant => { return { ...ant, [estate]: mensage } });
    }

    const verifyData = () => {
        let verify = true;
        setMessage(false);
        if (name === "") {
            establecerState("name", "Los campos no deben estar vacios");
            verify = false;
        }
        if (mail === "") {
            establecerState("mail", "Los campos no deben estar vacios");
            verify = false;
        }else if (useValidateMail(mail)){
            establecerState("mail", "Debes digitar un correo electronico valido.");
            verify = false;
        }
        if (password.length < 8) {
            establecerState("contra", "Debe tener al menos 8 digitos");
            verify = false;
        }
        if (password2.length < 8) {
            establecerState("contra2", "Debe tener al menos 8 digitos");
            verify = false;
        }
        if (password !== password2) {
            establecerState("contra2", "Las contraseñas no coinciden");
            verify = false;
        }

        if (verify) {
            const data = {
                fullname: name,
                mail,
                password,
            }
            sendData(data);
        }
    }

    const sendData = async (data) => {
        const createUser = await apiCreateUser(data);
        if (createUser) {
            if (!createUser.error && createUser.status === 201) {
                setUserCreate({
                    status: "success",
                    title: "Usuario Creado."
                });
                clearForm();
            }else if (createUser.error && createUser.status === 1062) {
                setUserCreate({
                    status: "warning",
                    title: "Cuenta ya Existente."
                });
            }else if (createUser.error && createUser.status === 422){
                setUserCreate({
                    status: "error",
                    title: "Datos Erroneos, por favor intentar mas tarde."
                });
                clearForm();
            }else {
                setUserCreate({
                    status: "error",
                    title: "Por favor intentar mas tarde."
                });
                clearForm();
            }
        }else {
            setUserCreate({
                status: "error",
                title: "No hay conexion al servidor, Por favor intentar mas tarde."
            });
        }
    }

    const clearForm = () => {
        setName('');
        setMail('');
        setPassword('');
        setPassword2('');
    }

    const showAlert = (close = false) => {
        if (!close) {
            setTimeout(() => {
                setUserCreate(false);
            }, 7000);
            return (<AlertView status={ userCreate.status } title={ userCreate.title } close={ showAlert }/>);
        }
        setUserCreate(false);
    }

    return (
        <Box safeArea p="0" py="8" w="100%" maxW="290" mt="10">
            <ScrollView height="90%">
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
                    Registrarse
                </Heading>
                {
                    userCreate ? showAlert() : false
                }
                

                <VStack space={3} mt="5">
                        <FormControl isRequired isInvalid={ (message.name ? true : false) }>
                            <FormControl.Label>Nombre Completo </FormControl.Label>
                            <Input
                                placeholder="Nombre y Apellido"
                                variant="underlined"
                                _focus={{ borderColor: "transparent", borderBottomColor: "indigo.500", borderWidth: 2 }}
                                onChangeText={ e => setName(e) }
                                value={ name }
                            />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                { message.name ? message.name : "" }
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={ (message.mail ? true : false) }>
                            <FormControl.Label>Correo Electronico </FormControl.Label>
                            <Input
                                placeholder="example@gmail.com"
                                variant="underlined"
                                _focus={{ borderColor: "transparent", borderBottomColor: "indigo.500", borderWidth: 2 }}
                                onChangeText={ e => setMail(e) }
                                value={ mail }
                            />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                { message.mail ? message.name : "" }
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={ (message.contra ? true : false) }>
                            <FormControl.Label>Contraseña</FormControl.Label>
                            <Input
                                type={ !view ? "password" : "" }
                                placeholder="********"
                                variant="underlined"
                                _focus={{ borderColor: "transparent", borderBottomColor: "indigo.500", borderWidth: 2 }}
                                onChangeText={ e => setPassword(e) }
                                InputRightElement={
                                    <Icon
                                        as={ view ? <MaterialIcons name="visibility" /> : <MaterialIcons name="visibility-off" /> }
                                        size={5}
                                        mr="2"
                                        color="muted.400"
                                        onPress={ () => { setView(useViewPassword(view)) } }
                                    />
                                }
                                value={ password }
                            />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                { message.contra ? message.contra : "" }
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={ (message.contra2 ? true : false) }>
                            <FormControl.Label>Confirmar Contraseña</FormControl.Label>
                            <Input
                                type={ !view2 ? "password" : "" }
                                placeholder="********"
                                variant="underlined"
                                _focus={{ borderColor: "transparent", borderBottomColor: "indigo.500", borderWidth: 2 }}
                                onChangeText={ e => setPassword2(e) }
                                InputRightElement={
                                    <Icon
                                        as={ view2 ? <MaterialIcons name="visibility" /> : <MaterialIcons name="visibility-off" /> }
                                        size={5}
                                        mr="2"
                                        color="muted.400"
                                        onPress={ () => { setView2(useViewPassword(view2)) } }
                                    />
                                }
                                value={ password2 }
                            />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                { message.contra2 ? message.contra2 : "" }
                            </FormControl.ErrorMessage>
                        </FormControl>
                </VStack>
            </ScrollView>
            <Button mt="4" colorScheme="indigo" onPress={ () => verifyData()}>
                Ingresar
            </Button>
        </Box>
    )
}
