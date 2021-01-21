import * as React from 'react';
import { View, Text, Image, ActivityIndicatorBase, ActivityIndicator } from 'react-native';
import { AppConfig } from '../../config/app';

export function LoadingScreen () {
    return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:30}}>{AppConfig.name}</Text>
        <Image source={require('./../../assets/imgs/cit-pb.png')} style={{width:210, height:200}} />
        <Text>Centro de Inovação Tecnológica</Text>
        <Text>@carloswgama</Text>
        <ActivityIndicator color="black" size={50} style={{marginTop: 20}}/>
    </View>
    );
}