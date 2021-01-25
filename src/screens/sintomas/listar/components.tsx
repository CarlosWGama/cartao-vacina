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
import { Sintoma, useTipoSintoma } from '../../../models/sintoma';

export function BtnNovoSintoma () {

    const nav = useNavigation();
    
    const novo = () => { nav.navigate('edicao') }

    return (
        <TouchableOpacity onPress={novo}>
            <View style={stylesBtnNV.container}>
                <MaterialIcons name="add" size={20} color="white"/>
                <Text style={[fontPadrao.regular, {color: 'white', textAlign:'center'}]}>Novo Sintoma</Text>
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
export function CardSintoma(props:{sintoma:Sintoma, onEditar?:any, onExcluir?:any}) {

    const {sintoma} = props;

    return (
        <View style={CardStyles.container}>
            {/* SINTOMA */}
            <Text style={[CardStyles.titulo, fontPadrao.negrito]}>Vacina - {useTipoVacina(sintoma.vacina)}</Text>
            <Text style={[CardStyles.subtitulo, fontPadrao.negrito]}>Sintoma: {useTipoSintoma(sintoma)}</Text>
            {/* DATAS */}
            <View style={[CardStyles.info, {marginVertical:5}]}>
                {/* DATA DA VACINA*/}
                <View style={{alignItems:'center'}}>
                    <Text style={{color:'white'}}>Data Vacina</Text>
                    <Text style={{color:'white'}}>{moment(sintoma.vacina?.dose1_data).format('DD/MM/YYYY')}</Text>
                </View>

                {/* DATA DO SINTOMA */}
                <View style={{alignItems:'center'}}>
                    <Text style={{color:'white'}}>Data Sintoma</Text>
                    <Text style={{color:'white'}}>{ moment(sintoma.data_ocorrencia).format('DD/MM/YYYY')}</Text>
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
    subtitulo: {fontSize: 15, color: 'black'},
    info: {flexDirection: 'row', justifyContent: 'space-around'}
});