import { useContext } from 'react'
import { View, SortableList } from 'react-native-ui-lib'

import * as Global from './Global'
import { WeatherCard } from './WeatherCard'

export function WeatherList() {
    let { data, setData } = useContext(Global.Locations)

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
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', width: Global.ScreenDimensions.width, paddingTop: Global.Spacing }}
            renderItem={({ item }) => {
                return (
                    <View style={{ marginBottom: Global.Spacing, backgroundColor: 'transparent' }}>
                        <WeatherCard name={item.name} coords={item.coords} />
                    </View>
                )
            }}
        />
    )
}
