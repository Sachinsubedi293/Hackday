import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Pressable } from 'react-native';
const Detail = ({navigation}) => {
    const [API, setAPI] = useState([]);
    setTimeout(() => {
        axios.get(`http://192.168.4.20:8888/ambulance/v1/`).then(res=>{setAPI(res.data)}).catch(err=>{alert(err)})
    }, 1000);

  return ( 
    API.map(res=>(
        <View style={{padding:10, top:0}} key={res.id+"Api"}>
            <Pressable onPress={()=>{alert("Future")}}>
            <Text>{res.id} {res.lon} {res.lat}</Text></Pressable>
        </View>
        
    ))

    
  )
}

export default Detail