import { useContext, useState } from 'react'
import { Checkbox, View } from 'react-native-ui-lib'

import * as Global from './Global'

export function SearchItem({ id, name, country, coords }: Global.SearchItemProps) {
    const { data, setData } = useContext(Global.Cities)
    const [added, setAdded] = useState(data.some(d => d.id === id))

    const onValueChanged = (value: boolean) => {
        setAdded(value)
        if (value) {
            setData(d => [...d, { id: id, name: name, coords: coords }])
        } else {
            setData(d => {
                return d.filter(data => data.id !== id)
            })
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
