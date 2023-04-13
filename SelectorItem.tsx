import { useContext, useState } from 'react'
import { Checkbox, View } from 'react-native-ui-lib'

import * as Global from './Global'

export function SelectorItem({ id, name, country, coords }: Global.WeatherListItem) {
    const { finalData, setFinalData } = useContext(Global.FinalData)
    const [added, setAdded] = useState(finalData.some(d => d.id === id))

    const onValueChanged = (value: boolean) => {
        setAdded(value)
        if (value) {
            setFinalData(d => [...d, { id: id, name: name, country: country, coords: coords }])
        } else {
            setFinalData(d => d.filter(finalData => finalData.id !== id))
        }
    }

    return (
        <View style={{ margin: 8 }}>
            <Checkbox value={added} onValueChange={onValueChanged} color='#fff' iconColor="#000" containerStyle={{ backgroundColor: '#000' }}
                label={name + ', ' + country}
                labelStyle={{ color: '#fff' }} />
        </View>
    )
}
