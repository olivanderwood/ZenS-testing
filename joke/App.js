import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import StorageManager from './StorageManager'
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://192.168.1.71'

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
    voteJoke(joke?.id, true)
  }

  const voteNotFunny = () => {
    voteJoke(joke?.id, false)
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
      <View style={{padding: 16, paddingTop: 50, alignItems: 'center', justifyContent: 'center', width: '100%', flexDirection: "row", justifyContent: "space-between"}}>
        <View>
          <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/800px-Mercedes-Logo.svg.png'}} style={{width: 50, height: 50}}/>
        </View>
        <View style={{flexDirection: "row", justifyContent: "flex-end", alignItems:'center'}}>
          <View style={{alignItems:'flex-end', marginRight: 5}}>
            <Text style={{color: '#b4b4b4'}}>Handicrafted by</Text>
            <Text>Jim HLS</Text>
          </View>
          <Image source={{uri: 'https://banner2.cleanpng.com/20180418/xqw/kisspng-avatar-computer-icons-business-business-woman-5ad736ba3f2735.7973320115240536902587.jpg'}} style={{width: 50, height: 50, borderRadius: 50}}/>
        </View>
      </View>
      <View style={{backgroundColor: '#29b263', paddingHorizontal: 23, paddingVertical: 40, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <Text style={{color: 'white', fontSize: 20, marginBottom: 30}}>A joke a day keeps the doctor away</Text>
        <Text style={{color: 'white', fontSize: 12}}>If you joke wrong way, your teeth have to pay. (Serious)</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom:100, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', paddingTop: 100}}>
        {loading ? <ActivityIndicator /> : Boolean(joke?.id) ?  <Text style={{color: '#8a8a8a'}}>{joke.content}</Text> : <Text style={{color: '#8a8a8a'}}>That's all the jokes for today! Come back another day!</Text>}
      </ScrollView>
      <View style={{paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0}}>
         <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 50}}>
          <TouchableOpacity onPress={voteFunny}
                              disabled={!Boolean(joke?.id)}
                              style={{backgroundColor: '#2d7eda', color: 'white', alignItems:'center', padding: 10, width: 130, justifyContent: 'center', marginRight: 20}}>
              <Text style={{ color: 'white'}}>This is funny!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={voteNotFunny}
                              disabled={!Boolean(joke?.id)}
                              style={{backgroundColor: '#29b263', color: 'white', alignItems:'center', padding: 10, width: 130, justifyContent: 'center'}}>
              <Text style={{color: 'white'}}>This is not funny</Text>
            </TouchableOpacity>
         </View>
         <View style={{flex: 1, borderTopColor: '#b4b4b4', borderTopWidth: 0.8, bottom: 0, justifyContent:'flex-end', marginBottom: 16, paddingTop: 8}}>
           <Text style={{ color: '#b4b4b4', textAlign: 'center', flexWrap:'wrap',  justifyContent: 'flex-end', fontSize: 12}}>
              This app created as part of Hlsolutions program. The material contained on this website are provided for general information only and do not constitute any form of advice. HLS assumes no responsibility for the accuracy of any particular statement and accept no liability for any loss or damage which may arise from reliance on the information contained on this site.
           </Text>
           <Text style={{  textAlign: 'center', marginTop: 6}}>
             Copyright 2021 HLS
           </Text>
         </View>
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
