import * as React from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Vacina } from '../../../models/vacina';
import VacinaService from '../../../services/vacina.service';
import { AppMain, AppHeader, AppContainer, fontPadrao } from '../../../themes/theme'; 
import { BtnNovaVacina, BtnSair, CardVacina } from './components';
import * as Colors from './../../../themes/colors';
import { useNavigation } from '@react-navigation/native';

export function VacinasListarScreen () {

    const [ vacinas, setVacinas] = React.useState<Vacina[]>([]);
    const [ buscando, setBuscando ] = React.useState(true);
    const nav = useNavigation();

    //Funções
    const buscarVacinas = async () => {
      const vacinas = await VacinaService.buscar();
      setBuscando(false);
      setVacinas(vacinas);
    }

    const excluir = (vacina: Vacina) => {
      Alert.alert('Excluir Vacina', 'Deseja excluir essa vacina?', [
        {text: 'Cancelar'},
        {text: 'Confirmar', onPress: async () => {
          await VacinaService.excluir(vacina.id);
          setBuscando(true);
          await buscarVacinas();
          setBuscando(false);
        }}
      ])
    }

    const editar = (vacina: Vacina) => {
      nav.navigate('edicao', {vacina})
    }

    //Inicial
    React.useEffect(() => {
      nav.addListener('focus', () => {
        buscarVacinas();
      })
    }, [])

    return (
      <AppMain>
        <AppHeader leftComponent={<BtnSair/>} titulo="Suas Vacinas" />
        <AppContainer verticalAlign="flex-start" horizontalAlign="stretch">
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={[fontPadrao.negrito, {fontSize: 30}]}>Vacinas</Text>
              <BtnNovaVacina />
            </View>
            
            { buscando && <ActivityIndicator size={40} color={Colors.PRIMARY}/> }
            <FlatList
                data={vacinas}
                keyExtractor={(data) => String(data.id)}
                renderItem={({item}) => (
                  <CardVacina 
                      vacina={item}
                      onEditar={() => editar(item)}
                      onExcluir={() => excluir(item)}
                  />
                )}

              />



        </AppContainer>
      </AppMain>
    );
}