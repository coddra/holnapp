import { useContext } from 'react'
import { Button } from 'react-native-ui-lib'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import * as Global from './Global'

export function AddButton() {
    const { data } = useContext(Global.Locations)
    const { showAddView, setShowAddView, setSearchText, setSearchResult, setFinalData } = Global.useListViewContext()

    const opacity = useAnimatedStyle(() => {
        return {
            opacity: withTiming(showAddView ? 0 : 1, { duration: Global.AnimationLength }),
            bottom: withTiming(showAddView ? Global.ButtonSize : 0, { duration: Global.AnimationLength })
        };
    });

    const onPress = () => {
        setShowAddView(() => true)
        setSearchText(() => '')
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
