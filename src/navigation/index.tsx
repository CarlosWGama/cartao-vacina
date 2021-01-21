import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/login';
import { CadastroScreen } from '../screens/cadastro';
import { RecuperarSenhaScreen } from '../screens/recuperar-senha';
import { InicialScreen } from '../screens/inicial';
import AppNavigation from './app';

const Stack = createStackNavigator();

const MainNavigation = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{animationEnabled:true, headerShown: false, }} >
            <Stack.Screen name="inicial" component={InicialScreen} />
            
            {/* NÃO AUTENTICADO */}
            <Stack.Screen name="login" component={LoginScreen}/>    
            <Stack.Screen name="cadastro" component={CadastroScreen} options={{cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS}}/>    
            <Stack.Screen name="recuperar-senha" component={RecuperarSenhaScreen} options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}/>    

            {/* AUTENTICADO */}
            <Stack.Screen name="app" component={AppNavigation} options={{cardStyleInterpolator:CardStyleInterpolators.forScaleFromCenterAndroid}}/>    
        </Stack.Navigator>
    </NavigationContainer>
)

export default MainNavigation;