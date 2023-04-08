import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native-ui-lib'

import { Header } from './Header'
import { WeatherList } from './WeatherList'
import { Cities, WeatherListItem } from './Context'

export default function App() {
  const [data, setData] = useState([] as WeatherListItem[])

  useEffect(() => {
    AsyncStorage.getItem('Holnapp').then((result) => {
      if (result) {
        setData(JSON.parse(result))
      }
    })
    setData([{ id: 'Budapest47.4979937:19.0403594', name: 'Budapest', coords: { lat: 47.4979937, lon: 19.0403594 } },
    { id: 'Balatonalmádi47.030277:', name: 'Balatonalmádi', coords: { lat: 47.030277, lon: 18.0155756 } }])
  }, [])


  return (
    <Cities.Provider value={{ data: data, setData: setData }}>
      <Header />
      <View flex center>
        <WeatherList />
      </View>
    </Cities.Provider>
  );
}
