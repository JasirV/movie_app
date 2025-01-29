import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/homeScreen';
import MovieScreen from './src/screen/movieScreen';
import {useFonts} from 'expo-font'
import AppLoading  from 'expo-app-loading';
const stack =createStackNavigator()
export default function App() {
  const [fontLoaded]=useFonts({
    Regular:require('./assets/fonts/NunitoSans_10pt-Regular.ttf')
  })
  
  return fontLoaded? (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="home" component={HomeScreen} options={{headerShown:false}} />
        <stack.Screen name="movie" component={MovieScreen} options={{headerShown:false}} />
      </stack.Navigator>
    </NavigationContainer>
  ):(
    <AppLoading/>
  )
}

