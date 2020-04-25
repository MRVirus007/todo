import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import { AdMobBanner } from 'expo-ads-admob';

export default function App() {
  const [todos, setTodos] = useState([
    
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }

  const submitHandler = (text) => {
    if(text.length > 3) {
      setTodos((prevTodos) => {
        return [
          { text: text, key: Math.random().toString() },
          ...prevTodos
        ]
      });
    } else {
      Alert.alert('OOPS!', 'Todos must be over 3 chars long', [
        { text:'Understood'}
      ])
    }
  }


  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler}/>
          <View style={styles.list}>
            <FlatList 
            data={todos}
            renderItem={({ item }) => (
            <TodoItem item={item} pressHandler={pressHandler}/>
            )}/>
          </View>
        </View>
        <AdMobBanner style={styles.admobStyle}
          bannerSize="banner"
          adUnitID="ca-app-pub-6761083167545224/9690653302"/>       
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
    flex: 1

  },
  list: {
    marginTop: 20,
    flex: 1
  },
  admobStyle: {
    alignItems: 'center'
  }
});
