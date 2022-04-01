import AsyncStorage from '@react-native-async-storage/async-storage';


async function setData(key, data) {
  try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

async function getData(key) {
    try {
      let userData = await AsyncStorage.getItem(key);
      let data = JSON.parse(userData);
      return data
    } catch (error) {
      console.log("Something went wrong", error);
    }
}

async function removeData(key) {
  try {
      await AsyncStorage.removeItem(key);
      return true;
  }
  catch(exception) {
      return false;
  }
}


export default {
    getData,
    setData,
    removeData,
}