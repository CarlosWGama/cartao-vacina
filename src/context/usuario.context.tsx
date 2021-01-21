import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { string } from 'yup/lib/locale';
import { Usuario } from '../models/usuario';


export const UsuarioContext = React.createContext({} as {usuario: Usuario | null, saveUsuario: any, setUsuario: any})

export const UsuarioContextProvider = (props: any) => {

    const [usuario, setUsuario] = React.useState<Usuario|null>(null);
    const saveUsuario = async (usuario: Usuario|null) => {
        setUsuario(usuario);
        if (usuario) AsyncStorage.setItem("usuario", JSON.stringify(usuario));
        else AsyncStorage.removeItem("usuario");
    }
   
    //Inicializa
    useEffect(() => {
        (async() => {
            const value = await AsyncStorage.getItem("usuario");
            if (value) {
                console.log(value);
                setUsuario(JSON.parse(value));
            } 
        })();
    }, [])


    return (
        <UsuarioContext.Provider value={{usuario, saveUsuario, setUsuario}}>
            {props.children}
        </UsuarioContext.Provider>
    )
}

export const useUsuarioContext = () => React.useContext(UsuarioContext);