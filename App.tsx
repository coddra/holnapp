import { useState, useEffect } from 'react'
import { AppState } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as Global from './Global'
import { ListView } from './ListView'
import { SingleView } from './SingleView'

export default function App() {
  const [data, setData] = useState([] as Global.WeatherListItem[])
  const [singleView, setSingleView] = useState({ id: '', name: '', country: '', coords: { lat: 0, lon: 0 } })

  useEffect(() => {
    AsyncStorage.getItem('Holnapp').then((result) => {
      if (result) {
        setData(JSON.parse(result))
      }
    })
  }, [])

  AppState.addEventListener('change', state => {
    if (state === 'background' || state === 'inactive') {
      AsyncStorage.setItem('Holnapp', JSON.stringify(data));
    }
  });

  return (
    <Global.Locations.Provider value={{ data: data, setData: setData }}>
      <Global.SingleView.Provider value={{ singleView: singleView, setSingleView: setSingleView }}>
        <ListView />
        <SingleView />
      </Global.SingleView.Provider>
    </Global.Locations.Provider>
  );
}
