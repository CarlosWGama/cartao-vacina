import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, Text } from 'react-native';
import { Vacina } from '../../../models/vacina';
import { AppMain, AppToolbar, AppContainer } from '../../../themes/theme'; 
import { Formulario } from './components';

export function VacinaEdicaoScreen () {

    const route = useRoute();
    const [ vacina, setVacina ] = React.useState<Vacina>({});
    //Recupera vacina
    //@ts-ignore
    React.useEffect(() => {
        //@ts-ignore
        if (route.params?.vacina) setVacina(route.params?.vacina)

    }, [])


    const titulo = ('id' in vacina ? 'Edição de Vacina' : 'Cadastro de Vacina')
    

    return (
      <AppMain>
        <AppToolbar titulo={titulo} backScreen="listar"/>
        <AppContainer>

          <Formulario vacina={vacina}/>
        </AppContainer>
      </AppMain>
    );
}