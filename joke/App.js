import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import StorageManager from './StorageManager'
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://192.168.1.16'

export default function App() {

  const [listJokeId, setListJokeId] = useState([])
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(false)

  function getJoke(){
    setLoading(true)
    axios.get(BASE_URL+':3000/api/joke', {
      params: {
        listJokeId: listJokeId.length > 0 ? listJokeId?.join('') : ''
      }
    })
    .then((response) => {
      setJoke(response.data.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)

      setLoading(false)
    })
  }

  function addIdJokeTolist(id){
    let newJokeList = [...listJokeId]
    if(!newJokeList.includes(id)){
      newJokeList.push(id)
      setListJokeId(newJokeList)
    }
  }

  function voteJoke(id, isFun){

    axios.put(BASE_URL+':3000/api/votejoke', {
      body: {
        id, isFun
      }
    })
    .then((response) => {
      addIdJokeTolist(id)
      getJoke()

    })
    .catch((error) => {
    })
  }

  const voteFunny = () => {
    voteJoke(joke.id, true)
  }

  const voteNotFunny = () => {
    voteJoke(joke.id, false)
  }

  useEffect(() => {
    StorageManager.getData('listJokeId').then((data) => {
      if(data){
        setListJokeId(JSON.parse(data))
      }
    })

    getJoke()

    return () => {
      StorageManager.setData('listJokeId', JSON.stringify(listJokeId)).then((data) => {
      })
    }
  }, [])


 

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <View style={{backgroundColor: 'green', padding: 16, paddingTop: 100, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <Text style={{color: 'white', fontSize: 20}}>A joke a day keeps the doctor away</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom:100, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', paddingTop: 100}}>
        {loading ? <ActivityIndicator /> : Boolean(joke.id) ?  <Text>{joke.content}</Text> : <Text>That's all the jokes for today! Come back another day!</Text>}
      </ScrollView>
      <View style={{height: 80, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', position: 'absolute', bottom: 0}}>
          <TouchableOpacity onPress={voteFunny}
                            disabled={!Boolean(joke.id)}
                            style={{backgroundColor: 'blue', color: 'white', alignItems:'center', padding: 16, justifyContent: 'center', marginRight: 20}}>
            <Text style={{ color: 'white'}}>This is funny!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={voteNotFunny}
                            disabled={!Boolean(joke.id)}
                            style={{backgroundColor: 'green', color: 'white', alignItems:'center', padding: 16, justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>This is not funny</Text>
          </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
