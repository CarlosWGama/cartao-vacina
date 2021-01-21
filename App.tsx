import React, { useEffect, useState } from 'react';
import MainNavigation from './src/navigation';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { LoadingScreen } from './src/screens/loading';
import * as Updates from 'expo-updates';
import { UsuarioContextProvider } from './src/context/usuario.context';

export default function App() {

  //Atualiza
  const [estaAtualizacao, setEstaAtualizacao] = useState(false);
  useEffect(() => {
    setEstaAtualizacao(true);
    //Busca por atualizações
    const update = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch(e) {
        console.log(e)
      }
      setEstaAtualizacao(false);
    }
    update();
  }, [])
  
  //Fonte
  let [fontsLoaded] = useFonts({Nunito_400Regular, Nunito_700Bold});
  if (!fontsLoaded || estaAtualizacao) return <LoadingScreen />;

  return (
    <UsuarioContextProvider>
      <MainNavigation/>
    </UsuarioContextProvider>
  );
}
