import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppConfig } from '../../config/app';
import { AppMain, fontPadrao } from '../../themes/theme'; 
import { Topo, Formulario } from './components';


export function LoginScreen (props: any) {

    return (
      <AppMain verticalAlign="space-between">
          <Topo/>
          <View style={{marginBottom:100}}></View>
          <View style={style.formulario}>
            <Formulario/>
          </View>
          <View style={style.rodape}>
            <Text style={fontPadrao.regular}>CESMAC - Centro de Inovação Tecnológica</Text>
            <Text style={fontPadrao.regular}>Versão {AppConfig.version}</Text>
          </View>
      </AppMain>
    );
}

const style = StyleSheet.create({
  formulario: {
    width: '60%',
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  }
})