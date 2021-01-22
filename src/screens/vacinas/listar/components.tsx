import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUsuarioContext } from '../../../context/usuario.context';
import { useTipoVacina, Vacina } from '../../../models/vacina';
import { fontPadrao } from '../../../themes/theme'; 
import moment from 'moment';
import * as Colors from './../../../themes/colors';
import { MaterialIcons } from '@expo/vector-icons';

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
//=============================================================================================================
export function BtnNovaVacina () {

    const nav = useNavigation();
    
    const novo = () => { nav.navigate('edicao') }

    return (
        <TouchableOpacity onPress={novo}>
            <View style={stylesBtnNV.container}>
                <MaterialIcons name="add" size={20} color="white"/>
                <Text style={[fontPadrao.regular, {color: 'white', textAlign:'center'}]}>Nova Vacina</Text>
            </View>
        </TouchableOpacity>
    );
}

const stylesBtnNV = StyleSheet.create({
    container: { 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY, 
        borderRadius: 10, 
        padding:5, 
        height:50,
        width: 120,

    }
});

//==============================================================================================================
export function CardVacina(props:{vacina:Vacina, onEditar?:any, onExcluir?:any}) {

    const {vacina} = props;

    return (
        <View style={CardStyles.container}>
            {/* VACINA */}
            <Text style={[CardStyles.titulo, fontPadrao.negrito]}>Vacina - {useTipoVacina(vacina)}</Text>
            {/* DATAS */}
            <View style={[CardStyles.info, {marginVertical:5}]}>
                {/* DOSE 1 */}
                <View style={{alignItems:'center'}}>
                    <Text style={{color:'white'}}>Dose 1</Text>
                    <Text style={{color:'white'}}>{moment(vacina.dose1_data).format('DD/MM/YYYY')}</Text>
                </View>

                {/* DOSE 2 */}
                <View style={{alignItems:'center'}}>
                    <Text style={{color:'white'}}>{ vacina.dose2_data ?  "Dose 2" : "Próxima dose"}</Text>
                    <Text style={{color:'white'}}>{ moment(vacina.dose2_data ? vacina.dose2_data : vacina.dose1_proxima_dose).format('DD/MM/YYYY')}</Text>
                </View>
            </View>
            {/* OPÇÕES */}
            <View style={CardStyles.info}>
                {/* EDITAR */}
                <TouchableOpacity onPress={props.onEditar}>
                    <View>
                        <MaterialIcons name="edit" size={30} color={Colors.PRIMARY}/>
                    </View>
                </TouchableOpacity>

                {/* EXCLUIR */}
                <TouchableOpacity onPress={props.onExcluir}>
                    <View>
                        <MaterialIcons name="delete-forever" size={30} color={Colors.DANGER}/>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const CardStyles = StyleSheet.create({
    container:{ 
        backgroundColor: Colors.TERTIARY, 
        margin: 5, 
        padding: 10, 
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
    titulo: {fontSize: 20, color: 'black'},
    info: {flexDirection: 'row', justifyContent: 'space-around'}
});