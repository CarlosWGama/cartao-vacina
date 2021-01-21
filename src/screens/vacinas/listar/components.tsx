import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUsuarioContext } from '../../../context/usuario.context';
import { AppMain, fontPadrao } from '../../../themes/theme'; 

export function BtnSair () {
    const nav = useNavigation();
    const { saveUsuario } = useUsuarioContext();
    
    const sair = () => {
        saveUsuario(null);
        nav.navigate('login');
    }


    return (
        <TouchableOpacity onPress={sair}>
            <View style={{borderColor: 'white', borderWidth: 1, borderRadius: 10, padding:5, width:50, marginLeft: 10}}>
                <Text style={[fontPadrao.regular, {color: 'white', textAlign:'center'}]}>SAIR</Text>
            </View>
        </TouchableOpacity>
    );
}
