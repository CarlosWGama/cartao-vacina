import * as React from 'react';
import { View, Text } from 'react-native';
import { AppMain, AppHeader, AppContainer, fontPadrao } from '../../themes/theme'; 

export function ConfiguracoesScreen () {

    return (
      <AppMain>
        <AppHeader titulo="Configurações" posicao="center"/>
        <AppContainer verticalAlign="flex-start" horizontalAlign="flex-start">
            <Text style={[fontPadrao.negrito, {fontSize: 30}]}>Configurações</Text>
            <Text>bbbbb</Text>
        </AppContainer>
      </AppMain>
    );
}