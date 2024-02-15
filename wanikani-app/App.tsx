import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Overview from "./src/views/Overview/Overview";
import Reviews from "./src/views/Reviews/Reviews";
import {Text} from "react-native"

import { useFonts, Roboto_100Thin, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';




const Stack = createNativeStackNavigator<RootStackParamList>();


export type RootStackParamList = {
  Overview: undefined;
  Reviews : undefined
}



export default function App() {

  let [fontsLoaded, fontError] = useFonts({
         Roboto_100Thin,
         Roboto_400Regular,
         Roboto_700Bold
     });

     if (!fontsLoaded && !fontError) {
         return null;
     }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Overview" screenOptions={{
        headerStyle: {
          backgroundColor: '#172959',
        },
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Roboto_400Regular'
        },
        animation: "fade_from_bottom"
      }}>
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="Reviews" component={Reviews} />

      </Stack.Navigator>
      <StatusBar/>
    </NavigationContainer>
  );
}
