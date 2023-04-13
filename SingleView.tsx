import { useContext } from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

import * as Global from './Global'
import { Header } from './Header'
import { ListViewButton } from './ListViewButton'

export function SingleView() {
    const { singleView } = useContext(Global.SingleView)

    const slide = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: 0,
            left: withTiming(singleView.id === '' ? Global.ScreenDimensions.width : 0, { duration: Global.AnimationLength }),
            width: Global.ScreenDimensions.width,
            height: Global.ScreenDimensions.height,
            flex: 1,
        }
    })

    return (
        <Animated.View style={slide}>
            <Header title={singleView.name} />
            <ListViewButton />
        </Animated.View>
    )
}
