
import * as React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import Form from './components/Form';

function HomeScreen({navigation}) {
  return (
    <View style = {styles.button}>
    <Button
      buttonStyle={{backgroundColor: '#008b8b',width:120}}
      title="Create New Name Card"
      onPress={() => {
        navigation.navigate('Name Card Form');
      }}
    />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Name Card Form" component={Form}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
  },
});
