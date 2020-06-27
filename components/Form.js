import * as React from 'react';
import { StyleSheet, Text, View,TextInput,ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import greyback from '../assets/greyback.jpg';

export default function Form({ route,navigation }) {

const {addCard} = route.params;

  return (
    <ImageBackground source={greyback} style={styles.backgroundImage}>
    <View style={styles.container}>
    <Formik
      initialValues={{name:'', phone:'', email:'', address:'', school:'', major:'', year:''}}
      onSubmit={(values, actions)=>{
        actions.resetForm();
        addCard(values);
      }}
    >
      {(props)=>(
        <View >
          <TextInput
            style={styles.input}
            placeholder='your name'
            placeholderTextColor = '#696969'
            onChangeText={props.handleChange('name')}
            value={props.values.name}
          />
          <TextInput
            style={styles.input}
            placeholder='your phone number'
            placeholderTextColor = '#696969'
            onChangeText={props.handleChange('phone')}
            value={props.values.phone}
            keyboardType='numeric'
          />
          <TextInput
            style={styles.input}
            placeholder='your email address'
            placeholderTextColor = '#696969'
            onChangeText={props.handleChange('email')}
            value={props.values.email}
          />
          <TextInput
            style={styles.input}
            placeholder='house address'
            placeholderTextColor = '#696969'
            onChangeText={props.handleChange('address')}
            value={props.values.address}
          />
          <TextInput
            style={styles.input}
            placeholder='your school'
            placeholderTextColor = '#696969'
            onChangeText={props.handleChange('school')}
            value={props.values.school}
          />
          <TextInput
            style={styles.input}
            placeholder='your major(s)'
            placeholderTextColor = '#696969'
            onChangeText={props.handleChange('major')}
            value={props.values.major}
          />
          <TextInput
            style={styles.input}
            placeholder='school year'
            placeholderTextColor = '#696969'
            onChangeText={props.handleChange('year')}
            value={props.values.year}
            keyboardType='numeric'
          />
          <Button title='submit' color='maroon' onPress={props.handleSubmit} />
        </View>
      )}
      </Formik>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    alignItems: 'center',
    color:'black',
  },
  backgroundImage: {
    height:'100%',
    width:'100%',
  },
});
