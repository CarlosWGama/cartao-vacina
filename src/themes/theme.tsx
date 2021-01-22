import React, { useState } from 'react'
import styled from 'styled-components/native'
import * as Colors from './colors';
import { Text, TouchableOpacity, View, Image, StyleSheet, DynamicColorIOS } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { onChange } from 'react-native-reanimated';

export const AppMain: any = styled.View`
    flex: 1;
    background: white;
    align-items: ${(props:any) => props.horizontalAlign ?  props.horizontalAlign : 'center'};
    justify-content: ${(props:any) => props.verticalAlign ?  props.verticalAlign : 'center'};
`

export const AppContainer: any  = styled.View`
    margin-top: ${(props:any) => props.noMarginTop ?  '0px' : '80px'};
    width: 100%;
    padding: 20px;
    flex: 1;
    align-items: ${(props:any) => props.horizontalAlign ?  props.horizontalAlign : 'center'};
    justify-content: ${(props:any) => props.verticalAlign ?  props.verticalAlign : 'center'};
`

export const AppTextError: any = styled.Text`
    color: red;
    text-align: right;
    margin-bottom: 10px;
    font-family: Nunito_400Regular;
`

export const AppBackground = (props:{horizontalAlign?:string, verticalAlign?:string, children:any}) => (
    <View style={{flex:1}}>
        <Image source={require('./../assets/imgs/bg.png')} style={{
            width:'100%',
            height:'100%',
            position: 'absolute'
        }}/>
        <View style={{padding:20, paddingTop:40, flex: 1}}>
            {props.children}
        </View>
    </View>
)


export const AppButton = (props: {title:string, onPress?:any, style?:any, color?: string}) => (
    <View style={[{backgroundColor: (!props.color ? Colors.PRIMARY : props.color), padding: 10, borderRadius: 5}, props.style]}>
        <TouchableOpacity onPress={() => props.onPress()}>
            <Text style={{color:'white', textAlign:'center', fontFamily:'Nunito_400Regular'}}>{props.title}</Text>
        </TouchableOpacity>
    </View>
)

export const AppInput = (props: {titulo?: string, children:any, touched?:boolean, error?:string, noBorder?: boolean}) => (
    <View style={[{width:'100%', flexDirection:'column', justifyContent:'center', marginVertical:5, minHeight: 40}, (props.noBorder ? {} : {borderBottomWidth: 1, borderBottomColor: 'lightgrey'})]}>
        {/* CAMPO */}
        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
            {props.titulo && <Text style={{width:100, fontFamily:'Nunito_400Regular'}}>{props.titulo}:</Text>}
            <View style={{flex:1, alignItems:'stretch'}}>{props.children}</View>
        </View>
        {/* ERRRO */}
        <View>
            {props.touched && props.error && <AppTextError>{props.error}</AppTextError>}
        </View>
    </View>
)

export const AppBackButton = (props:{backScreen?:string}) => {
    const nav = useNavigation();

    return (<TouchableOpacity onPress={() => {
        (props.backScreen ? nav.navigate(props.backScreen) : nav.goBack())
    }}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Ionicons name="ios-arrow-back" color="white" />
            <Text style={{color:'white', marginLeft: 5}}>VOLTAR</Text>
        </View>
    </TouchableOpacity>)
}

export const AppHeader = (props: {titulo: string, leftComponent?: any, rightComponent?:any, posicao?: 'left'|'right'|'center'}) => {

    return (
        <View style={{width:'100%'}}>
            {/* Encaixe Superior */}
            <View style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                paddingTop: 10,
                height: 120,
                backgroundColor: Colors.PRIMARY,
                borderBottomStartRadius: (['left',undefined].includes(props.posicao) ? 70 : 0),
                borderBottomEndRadius: (['right'].includes(props.posicao) ? 70 : 0),
            }}>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', padding: 20}}>
                    {/* Conteudo Esquerda */}
                    <View>{props.leftComponent}</View>
                    {/* Título */}
                    <View><Text style={{color:'white', textTransform: 'uppercase', fontFamily:'Nunito_400Regular'}}>{props.titulo}</Text></View>
                    {/* Conteudo Direita */}
                    <View>{props.rightComponent}</View>
                </View>
            </View>
            {/* Curva Inferior */}
            <View
                style={{
                    marginTop: 120,
                    backgroundColor: Colors.PRIMARY,
                    height: 100,
                    marginBottom: -150
                }}
            >       
                <View style={{flex: 1, backgroundColor: 'white', borderTopRightRadius: (['left',undefined, 'center'].includes(props.posicao) ? 100 : 0), borderTopStartRadius: (['right', 'center'].includes(props.posicao) ? 100 : 0)}}></View>
            </View>
        </View>
    )
}

export const AppToolbar = (props:{backButton?:boolean, backScreen?:string, titulo: string, extra?:any, backgroundColor?: string}) => {

    return (
        <View style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            paddingTop: 10,
            height: 80,
            backgroundColor: (props.backgroundColor ? props.backgroundColor : Colors.SECONDARY),
            borderBottomStartRadius: 10,
            borderBottomEndRadius: 10
        }}>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', padding: 20}}>
                {/* Botão Voltar */}
                <View>
                    {(props.backButton || props.backScreen) &&
                        <AppBackButton backScreen={props.backScreen}/>
                    }
                </View>
                {/* Título */}
                <View><Text style={{color:'white', textTransform: 'uppercase', fontFamily:'Nunito_400Regular'}}>{props.titulo}</Text></View>
                {/* Botão Extras */}
                <View>{props.extra}</View>
            </View>
        </View>
    )
}

export function AppCalendario(props: {valor?: string, onChange: any}) {
    
    const [ calendario, setCalendario ] = useState(false);
    const { valor, onChange } = props;

    return (
    <>
        <TouchableOpacity onPress={() => setCalendario(true)}>
            <Text>{valor != undefined ? moment(valor).format('DD/MM/YYYY') : 'Clique para selecionar data'}</Text>
        </TouchableOpacity>
        {calendario && 
            <DateTimePicker
            value={ (valor != undefined ? new Date(valor) : new Date())}
            mode="date"
            onChange={(event, data) => {
                setCalendario(false);
                onChange(moment(data).format('YYYY-MM-DD'))
            }}
            />}
    </>)
} 


export const fontPadrao = StyleSheet.create({
    regular:{fontFamily:'Nunito_400Regular'}, 
    negrito: {fontFamily:'Nunito_700Bold'}
})