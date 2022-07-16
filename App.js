import React, { useState, useEffect ,useNavigation} from 'react';
import {  StyleSheet, Text, View, Dimensions ,Button,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView,{Marker} from 'react-native-maps';
import * as Location from 'expo-location'
import { StatusBar } from 'react-native';
import axios from 'axios';
import {   Pressable,  } from "react-native";
import { Alert, Modal,
} from 'react-native';
import Markerss from './components/MAaker2';
import Markers from './components/Marker';
import Detail from './components/Detail';
function HomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [API, setAPI] = useState([]);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location)
    location &&   setLocation(location);
    })();
    
  }, []);
  useEffect(() => {
    axios.get(`http://192.168.4.20:8888/ambulance/v1/`).then(res=>{setAPI(res.data)}).catch(err=>{alert('There is error')})
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } 

  function Buttonsos(){
    const [modalVisible, setModalVisible] = useState(false);
    return(
      <View style={{position: 'absolute',
      bottom:150,
      padding:0.5,
      right:20,
      backgroundColor:"white",
      borderRadius:50,
        zIndex:100,
      }}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>I'm Sure About Calling an Ambulance.{"\n"}</Text>
            <View style={styles.butcon}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable onPress={Sendlocation} style={[styles.button, styles.buttonClose]}><Text style={styles.textStyle}>Call SOS</Text></Pressable></View>
          </View>
        </View>
      </Modal>
      <Pressable title='Hello' onPress={() => setModalVisible(true)}><Image source={require('./assets/favicon.png')} style={{maxHeight:50,maxWidth:50}}></Image></Pressable></View>
    )
  }
  function Sendlocation(){
    
axios.post(`http://192.168.4.20:8888/emergency/v1/`,{lon:location?.coords?.longitude,lat:location?.coords?.latitude}).then(res=>{alert("Successfully Alerted ")}).catch(err=>{console.log(err);})

  }
  function ButtonMain(){
    return(
      <View style={{position: 'absolute',
      bottom:60,
      padding:0.5,
      right:20,
      backgroundColor:"white",
      borderRadius:50,
        zIndex:100,
      }}>
      <Button  onPress={mylocation} title="ME"><Image source={require('./assets/sos.png')} style={{maxHeight:50,maxWidth:50}} ></Image></Button></View>
    )
  }
const mylocation=()=>{
  alert("Hello")
  setlongitude(location.coords.longitude);
  setlatitude(location.coords.latitude);
}
  return (
    <View style={styles.container}>
      <StatusBar hidden></StatusBar>

       <Buttonsos></Buttonsos>
      <ButtonMain></ButtonMain>
     
       <View style={{position: 'absolute',
      bottom:100,
      padding:0.5,
      right:20,
      backgroundColor:"white",
      borderRadius:50,
        zIndex:100,
      }}>
      <Button  onPress={() => navigation.push('Details')} title="Detail"></Button></View>
        {location?
        <MapView style={styles.map} region={{
          longitude:longitude,
          latitude:latitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
          <Markers/>
       <Markerss/>
        
        <Marker coordinate={{
          longitude:location.coords.longitude,
          latitude:location.coords.latitude
        }} title="RABI" image={require('./assets/me.png')}  style={{flex:1,justifyContent:"center",maxHeight:50,maxWidth:50}}/></MapView>
        :<Text>Loading...</Text>}      
    </View>
  );
}
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Detail></Detail>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-80,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35, 
   
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  butcon:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:'space-between',
    alignItems: 'flex-start',
  }
});

