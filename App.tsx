import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Accelerometer, AccelerometerMeasurement } from 'expo-sensors';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [location, setLocation] = useState<Location.LocationObject | null>( );
  const [ErrorMsg, setErrorMsg] = useState('');
  const [quedas, setQuedas] = useState<AccelerometerMeasurement[]>([]);
  useEffect(() => {
    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      if (Math.abs(accelerometerData.x) > 1.1 ||
          Math.abs(accelerometerData.y) > 1.1 ||
          Math.abs(accelerometerData.z) > 1.1) {
            posicaoAtual = async
            setQuedas((quedas) => [...quedas, accelerometerData]);
      }
      });
    return () => subscription.remove();
  }, []);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada');
        return;
      }
    })();
  }, []);


  const posicaoAtual = async() => {
      const local = await
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>{errorMsg ? errorMsg : 'Permissão concedida'}</Text>
      <Text style={styles.text}>Detector de Quedas</Text>
      <Text style={styles.text}>Latitude: {location?.coords.latitude}
                                Longitude: {location?.coords.longitude}
                                Altitude: {location?.coords.altitude}</Text>
      <Button title='Limpar' onPress={() =>setQuedas([])}/>
      <Text style={styles.text}>
  Aceleração: X: {data.x.toFixed(2)},
              Y: {data.y.toFixed(2)},
              Z: {data.z.toFixed(2)}
</Text>
{quedas.map((queda, index) =>
  (<Text key={index}>
    Queda: {index}
    x: {queda.x.toFixed(2)}
    y: {queda.y.toFixed(2)}
    z: {queda.z.toFixed(2)}
    </Text>))}
    </View>
  );

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    margin: 10,
  },
});
