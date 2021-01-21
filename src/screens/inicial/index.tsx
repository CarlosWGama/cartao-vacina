import * as React from 'react';
import { LoadingScreen } from '../loading';
import { useNavigation } from '@react-navigation/native';
import { useUsuarioContext } from './../../context/usuario.context';
import AsyncStorage from '@react-native-community/async-storage';

export function InicialScreen () {

    //Navigation
    const nav = useNavigation();
    const { usuario, saveUsuario, setUsuario } = useUsuarioContext();

    React.useEffect(() => {
        const init = async() => {
            const value = await AsyncStorage.getItem("usuario");
            if (value) setUsuario(JSON.parse(value));
            nav.navigate((value ? 'app' : 'login'));
        }

        init();
    }, [])


    return <LoadingScreen/>;
}