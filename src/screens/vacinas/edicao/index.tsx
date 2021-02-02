import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, Alert, Platform } from 'react-native';
import { Vacina } from '../../../models/vacina';
import { AppMain, AppToolbar, AppContainer } from '../../../themes/theme'; 
import { Formulario } from './components';
import * as Notifications from 'expo-notifications';


export function VacinaEdicaoScreen () {

    const route = useRoute()
    const nav = useNavigation();
    const [ vacina, setVacina ] = React.useState<Vacina>({tipo: 1});
    //Recupera vacina
    //@ts-ignore
    React.useEffect(() => {
        //@ts-ignore
        if (route.params?.vacina) setVacina(route.params?.vacina)

        //Verifica Permissão
        nav.addListener('focus', async () => {
          const { granted } = await Notifications.getPermissionsAsync();
          //Solicita permissão
          if (!granted) {
            Alert.alert("Notificações", "Para cadastrar uma vacina, libere a permissão de notificação. Esse recurso será usado para lembrá-lo da sua próxima dose e de lembrar caso sinta algum sintoma", [
              {text: "ok", onPress: async () => {
                const { granted } = await Notifications.requestPermissionsAsync();
                
                //Permissão não liberada
                if (!granted) nav.goBack();

                else if (Platform.OS === 'android') {
                  Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                  });
                }
              }}
            ])
          }
        })
        


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