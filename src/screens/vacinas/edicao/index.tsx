import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, Text } from 'react-native';
import { Vacina } from '../../../models/vacina';
import { AppMain, AppToolbar, AppContainer } from '../../../themes/theme'; 

export function VacinaEdicaoScreen () {

    const route = useRoute();
    const [ vacina, setVacina ] = React.useState<Vacina>({});
    //Recupera vacina
    //@ts-ignore
    React.useEffect(() => {
        //@ts-ignore
        if (route.params?.vacina) setVacina(route.params?.vacina)

    }, [])


    return (
      <AppMain>
        <AppToolbar titulo="Cadastro de usuário" backScreen="listar"/>
        <AppContainer>
            <Text>Conteúdo</Text>
        </AppContainer>
      </AppMain>
    );
}