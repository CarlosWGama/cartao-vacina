import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { VacinasListarScreen } from '../screens/vacinas/listar';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { fontPadrao } from '../themes/theme';
import * as Colors from '../themes/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//Vacina
const VacinaNavigation = () => (
    <Stack.Navigator initialRouteName="listar" screenOptions={{headerShown: false}}>
        <Stack.Screen name="listar" component={VacinasListarScreen} />
    </Stack.Navigator>
)


const AppNavigation = () => {
    
    const styleLabelFocus = (focused: boolean) => (focused ? [{color:Colors.PRIMARY}, fontPadrao.negrito] : [{color: 'black'}, fontPadrao.regular])
    const colorIconFocus = (focused: boolean) => (focused ? Colors.PRIMARY : 'black');
    const sizeIconFocus = (focused: boolean) => (focused ? 25: 15);

    return (<Tab.Navigator>
        {/* VACINAS */}
        <Tab.Screen name="vacinas" component={VacinaNavigation} 
            options={{
                tabBarLabel: ({focused}) => <Text style={styleLabelFocus(focused)}>Vácinas</Text>, 
                tabBarIcon: ({focused})=> <MaterialIcons name="calendar-today" color={colorIconFocus(focused)}  size={sizeIconFocus(focused)}/>}} />
        
        {/* SINTOMAS */}
        <Tab.Screen name="sintomas" component={VacinaNavigation} 
            options={{
                tabBarLabel: ({focused}) => <Text style={styleLabelFocus(focused)}>Sintomas</Text>, 
                tabBarIcon: ({focused})=> <MaterialIcons name="healing" color={colorIconFocus(focused)}  size={sizeIconFocus(focused)}/>}}/>
        
        {/* CONFIGURAÇÕES */}
        <Tab.Screen name="configuracoes" component={VacinaNavigation} 
            options={{
                tabBarLabel: ({focused}) => <Text style={styleLabelFocus(focused)}>Configurações</Text>, 
                tabBarIcon: ({focused})=> <MaterialIcons name="account-circle" color={colorIconFocus(focused)}  size={sizeIconFocus(focused)}/>}} />
    </Tab.Navigator>)
}


export default AppNavigation;