import { useContext } from 'react'
import { Button } from 'react-native-ui-lib'

import * as Global from './Global'

export function ListViewButton() {
    const { setSingleView } = useContext(Global.SingleView)

    const onPress = () => {
        setSingleView(d => {
            return { ...d, id: '' }
        })
    }

    return (
        <Button
            iconSource={require('./assets/angle-double-left.png')}
            style={{ position: 'absolute', bottom: Global.Spacing, left: Global.Spacing, width: Global.ButtonSize, height: Global.ButtonSize }}
            color='#fff'
            backgroundColor="#000"
            iconStyle={{ width: 32, height: 32 }}
            onPress={onPress}
        />
    )
}
