import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StartScreen, Dashboard, LoginScreen, RegisterScreen, ResetPasswordScreen} from '../screens';
import { DrawerNavigator } from './DrawerNavigator';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Menu'
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name='Dashboard' component={ Dashboard } />
        <Stack.Screen name='StartScreen' component={ StartScreen } />
        <Stack.Screen name='LoginScreen' component={ LoginScreen } />
        <Stack.Screen name='RegisterScreen' component={ RegisterScreen } />
        <Stack.Screen name='ResetPasswordScreen' component={ ResetPasswordScreen } />
        <Stack.Screen name='Menu' component={ DrawerNavigator } />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator;