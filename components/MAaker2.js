import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Marker} from 'react-native-maps';
const Markerss = () => {
const [API, setAPI] = useState([]);
setTimeout(() => {
    axios.get(`http://192.168.4.20:8888/emergency/v1/`).then(res=>{setAPI(res.data)}).catch(err=>{alert(err)})
}, 1000);
return(
API.map((res)=>(
     <Marker key={"marker"+res.id} coordinate={{
            longitude:res.lon,
            latitude:res.lat,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} title={res.title}   style={{flex:1,justifyContent:"center",maxHeight:20,maxWidth:20}}/>
    
    ))
)
}

export default Markerss