import { useState, useEffect } from 'react'
import { AppState } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native-ui-lib'

import { Header } from './Header'
import { WeatherList } from './WeatherList'
import * as Global from './Global'
import { AddButton } from './AddButton'
import { AddView } from './AddView'

export default function App() {
  const [data, setData] = useState([] as Global.WeatherListItem[])
  const [show, setShow] = useState(false)
  const [text, setText] = useState('')
  const [searchData, setSearchData] = useState([] as Global.SearchItemProps[])

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
    <Global.Cities.Provider value={{ data: data, setData: setData }}>
      <Header title="Holnapp" style={{}} />
      <View flex center>
        <WeatherList />
      </View>
      <Global.ShowAddView.Provider value={{ show: show, setShow: setShow }}>
        <Global.SearchText.Provider value={{ text: text, setText: setText }}>
          <Global.SearchData.Provider value={{ searchData: searchData, setSearchData: setSearchData }}>
            <AddView />
            <AddButton />
          </Global.SearchData.Provider>
        </Global.SearchText.Provider>
      </Global.ShowAddView.Provider>
    </Global.Cities.Provider>
  );
}
