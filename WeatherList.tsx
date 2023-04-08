import { useContext } from 'react'
import { View, SortableList } from 'react-native-ui-lib'

import * as Global from './Global'
import { WeatherCard } from './WeatherCard'

export function WeatherList() {
    let { data, setData } = useContext(Global.Cities)

    /* useEffect(() => {
 *     axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=budapest&limit=1&appid=${Global.AppID}`).then(response => {
 *         setData(d => d.some(i => i.id == 'budapest') ? d
 *             : [...d, { id: 'budapest', coords: { lat: response.data[0].lat, lon: response.data[0].lon } }])
 *     }).catch(error => {
 *         console.log(error.response.status + ': ' + error.response.statusText)
 *     })
 * }, []) */

    return (
        <SortableList
            data={data}
            onOrderChange={d => setData(data => {
                let i = 0
                for (const item of d) {
                    data[i] = item
                    i++
                }
                return data
            })}
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', width: Global.ScreenDimensions.width, paddingTop: Global.CardSpacing }}
            renderItem={({ item }) => {
                return (
                    <View style={{ marginBottom: Global.CardSpacing, backgroundColor: 'transparent' }}>
                        <WeatherCard name={item.name} coords={item.coords} />
                    </View>
                )
            }}
        />
    )
}
