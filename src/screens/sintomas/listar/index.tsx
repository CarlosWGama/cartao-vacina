import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Sintoma } from '../../../models/sintoma';
import SintomaService from '../../../services/sintoma.service';
import { AppMain, AppHeader, AppContainer, fontPadrao } from '../../../themes/theme'; 
import { BtnNovoSintoma, CardSintoma } from './components';
import * as Colors from './../../../themes/colors';

export function SintomasListarScreen () {

  const [ sintomas, setSintomas] = React.useState<Sintoma[]>([]);
  const [ buscando, setBuscando ] = React.useState(true);
  const nav = useNavigation();

  //Funções
  const buscarSintomas = async () => {
    const sintomas = await SintomaService.buscar();
    setBuscando(false);
    setSintomas(sintomas);
  }

  const excluir = (sintoma: Sintoma) => {
    Alert.alert('Excluir Sintoma', 'Deseja excluir essa sintoma?', [
      {text: 'Cancelar'},
      {text: 'Confirmar', onPress: async () => {
        SintomaService.excluir(sintoma.id);
        setBuscando(true);
        await buscarSintomas();
        setBuscando(false);
      }}
    ])
  }

  const editar = (sintoma: Sintoma) => {
    nav.navigate('edicao', {sintoma})
  }

  //Inicial
  React.useEffect(() => {
    nav.addListener('focus', () => {
      buscarSintomas()
    })
  }, [])

  return (
    <AppMain>
      <AppHeader titulo="Sintomas" posicao="right"/>

      <AppContainer verticalAlign="flex-start" horizontalAlign="stretch">
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={[fontPadrao.negrito, {fontSize: 30}]}>Sintomas</Text>
            <BtnNovoSintoma />
          </View>
          
          { buscando && <ActivityIndicator size={40} color={Colors.PRIMARY}/> }
          <FlatList
              data={sintomas}
              keyExtractor={(data) => String(data.id)}
              renderItem={({item}) => (
                <CardSintoma 
                    sintoma={item}
                    onEditar={() => editar(item)}
                    onExcluir={() => excluir(item)}
                />
              )}

            />



      </AppContainer>
    </AppMain>
  );
}