import { useContext } from 'react'
import { TextField } from 'react-native-ui-lib'
import axios from 'axios'

import * as Global from './Global'

export function SearchField() {
    const { setSearchResult } = useContext(Global.SearchResult)
    const { text, setText } = useContext(Global.SearchText)

    const onChangeText = (t: string) => {
        setText(() => t)
        if (t.length < 3) {
            return
        }
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${t}&limit=5&appid=${Global.AppID}`).then(response => {
            setSearchResult(() => response.data.map(d => {
                return { id: d.name + d.lat + ':' + d.lon, name: d.name, country: d.country, coords: { lat: d.lat, lon: d.lon } }
            }))
        }).catch(() => {
            setSearchResult(() => [])
        })
    }


    return (
        <TextField
            value={text}
            style={{ color: '#fff' }}
            returnKeyType='done'
            placeholder={'Search'} floatingPlaceholder
            onChangeText={onChangeText}
            fieldStyle={{ borderBottomWidth: 2, borderBottomColor: '#fff' }}
        />
    )
}
