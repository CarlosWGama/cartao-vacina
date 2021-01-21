import * as React from 'react';
import { View, Text } from 'react-native';
import { AppMain, AppHeader, AppContainer, fontPadrao } from '../../../themes/theme'; 
import { BtnSair } from './components';

export function VacinasListarScreen () {



    return (
      <AppMain>
        <AppHeader leftComponent={<BtnSair/>} titulo="Suas Vácinas" />
        <AppContainer verticalAlign="flex-start" horizontalAlign="flex-start">
            <Text style={[fontPadrao.negrito, {fontSize: 30}]}>Vácinas</Text>
            <Text>bbbbb</Text>
        </AppContainer>
      </AppMain>
    );
}