import * as React from 'react';
import { View, Text } from 'react-native';
import { AppMain, AppHeader, AppContainer, fontPadrao } from '../../../themes/theme'; 

export function SintomasListarScreen () {

    return (
      <AppMain>
        <AppHeader titulo="Seus Sintomas" posicao="right"/>
        <AppContainer verticalAlign="flex-start" horizontalAlign="flex-start">
            <Text style={[fontPadrao.negrito, {fontSize: 30}]}>Sintomas</Text>
            <Text>bbbbb</Text>
        </AppContainer>
      </AppMain>
    );
}