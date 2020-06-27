
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList,ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAsyncStorage } from '@react-native-community/async-storage';
import { Button } from 'react-native-elements';
import Form from './components/Form';
import greyback from './assets/greyback.jpg';

function HomeScreen({route,navigation}) {

  const sampleItem =
    {name:'kexin', phone:'7815471811', email:'zxksteph@gmail.com', address:'415 South Street',
    school:'Brandeis', major:'Econ, Applied Math, CS', year:'2021'}

  const [cards, setCards] = useState([sampleItem])
  const { getItem, setItem } = useAsyncStorage('CardBox')

  const readItemFromStorage = async () => {
    try {
      let item = await getItem();
      let newValue = JSON.parse(item);
      newValue = newValue || [sampleItem]
      setCards(newValue);
    }
    catch(e) {
      setCards([sampleItem])
    }
  };

  const writeItemToStorage = async newValue => {
    await setItem(JSON.stringify(newValue));
    setCards(newValue);
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  const addCard = (card) => {
    card.key = Math.random().toString();
    writeItemToStorage([card,...cards]);
  }

  const deleteItem = (key) => {
    const newCards = cards.filter(x => x.key!=key);
    writeItemToStorage(newCards);
  }

  return (
    <ImageBackground source={greyback} style={styles.backgroundImage}>
    <View style = {styles.button}>
    <Button
      buttonStyle={{backgroundColor: '#008b8b',width:240}}
      title="Create New Name Card"
      onPress={() => {
        navigation.navigate('Name Card Form',{addCard});
      }}
    />
    <FlatList style = {{marginTop:15}}
      data={cards}
      keyExtractor={(item, index) => 'key'+index}
      renderItem={({ item }) => <CardFormat card = {item} deleteItem = {deleteItem}/>} //create a Card.js to regulate the format
    />
    </View>
    </ImageBackground>
  );
}

function CardFormat({card,deleteItem}) {
  return (
      <Card>

      <Text style ={styles.cardtext}> Name:{card.name} Year:{card.year}</Text>
      <Button
        title = 'delete'
        buttonStyle={{backgroundColor: 'maroon', height:20, width:200}}
        onPress={() => {deleteItem(card.key)}}
      />
      </Card>
  );
}

function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        { props.children }
      </View>
    </View>
  )
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
    marginTop:15,
    alignItems: 'center',
  },
  cardtext: {
    marginTop:7,
    marginBottom:7,
    marginLeft:7,
    marginRight:7,
  },
  card:{
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent:{
    marginHorizontal: 18,
    marginVertical: 12,
  },
  backgroundImage: {
    height:'100%',
    width:'100%',
  },
});
