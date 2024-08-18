import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';
import { StackNavigator } from './src/Navigators/Stack_navigators';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  LogBox.ignoreAllLogs();
  LogBox.ignoreLogs(['warning:....']);
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  const Root = createNativeStackNavigator();
  SplashScreen.hide()
  return (
    <NavigationContainer>
      <Root.Navigator
        initialRouteName='Root'
        screenOptions={{
          headerShown: false,
        }}>
        <Root.Screen
          name="Root"
          options={{headerShown: false}}
          component={StackNavigator}
        />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return <App />;
};
