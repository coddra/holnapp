import { useContext } from 'react'
import { Button } from 'react-native-ui-lib'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import * as Global from './Global'

export function AddButton() {
    const { data } = useContext(Global.Locations)
    const { show, setShow } = useContext(Global.ShowAddView)
    const { setText } = useContext(Global.SearchText)
    const { setSearchResult } = useContext(Global.SearchResult)
    const { setFinalData } = useContext(Global.FinalData)

    const opacity = useAnimatedStyle(() => {
        return {
            opacity: withTiming(show ? 0 : 1, { duration: Global.AnimationLength }),
            bottom: withTiming(show ? Global.ButtonSize : 0, { duration: Global.AnimationLength })
        };
    });

    const onPress = () => {
        setShow(() => true)
        setText(() => '')
        setSearchResult(() => [])
        setFinalData(() => [...data])
    }

    return (
        <Animated.View style={opacity}>
            <Button
                iconSource={require('./assets/plus.png')}
                style={{ position: 'absolute', bottom: Global.Spacing, right: Global.Spacing, width: Global.ButtonSize, height: Global.ButtonSize }}
                color='#fff'
                backgroundColor="#000"
                iconStyle={{ width: 32, height: 32 }}
                onPress={onPress}
            />
        </Animated.View>
    )
}
