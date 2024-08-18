import {createStackNavigator} from '@react-navigation/stack';
import Product_list from '../Screens/Product_list';
import color from '../config/color/color.json';
import Product_details from '../Screens/Product_details';
import { Button } from 'react-native-elements';
import { View } from 'react-native';
const Stack = createStackNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="pp">
      <Stack.Screen
        name="Product_list"
        component={Product_list}
        options={{
          animationTypeForReplace: 'push',
          headerShown: true,
          headerTitle: 'Product List',
          headerTitleStyle: {
            color: color.Green,
            fontFamily: 'Poppins-Medium',
            fontSize: 17,
            alignSelf: 'center',
          },
          headerStyle: {backgroundColor: color.White_color},
        }}
      />
      <Stack.Screen
        name="Product_details"
        component={Product_details}
        options={{
          animationTypeForReplace: 'push',
          animation:'slide_from_right',
          headerShown: true,
          
          headerTitle: 'Product Details',
          headerTintColor:color.Green,
          headerTitleStyle: {
            color: color.Green,
            fontFamily: 'Poppins-Medium',
            fontSize: 17,
          },
          headerStyle: {backgroundColor: color.White_color},
          
        }}
      />
    </Stack.Navigator>
  );
}
