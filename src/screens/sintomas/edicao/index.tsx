import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, Text } from 'react-native';
import { Sintoma } from '../../../models/sintoma';
import { AppMain, AppToolbar, AppContainer } from '../../../themes/theme'; 
import { Formulario } from './components';

export function SintomaEdicaoScreen () {

    const route = useRoute();
    const [ sintoma, setSintoma ] = React.useState<Sintoma>({});
    //Recupera sintoma
    //@ts-ignore
    React.useEffect(() => {
        //@ts-ignore
        if (route.params?.sintoma) setSintoma(route.params?.sintoma)

    }, [])


    const titulo = ('id' in sintoma ? 'Edição de Sintoma' : 'Cadastro de Sintoma')
    

    return (
      <AppMain>
        <AppToolbar titulo={titulo} backScreen="listar"/>
        <AppContainer>

          <Formulario sintoma={sintoma}/>
        </AppContainer>
      </AppMain>
    );
}