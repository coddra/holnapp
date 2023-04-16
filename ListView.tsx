import { useState, useContext } from 'react'
import { View } from 'react-native-ui-lib'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

import * as Global from './Global'
import { WeatherList } from './WeatherList'
import { AddButton } from './AddButton'
import { AddView } from './AddView'
import { Header } from './Header'

export function ListView() {
    const { singleView } = useContext(Global.SingleView)

    const slide = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: 0,
            right: withTiming(singleView.id !== '' ? Global.ScreenDimensions.width : 0, { duration: Global.AnimationLength }),
            width: Global.ScreenDimensions.width,
            height: Global.ScreenDimensions.height,
            flex: 1
        }
    })

    return (
        <Animated.View style={slide}>
            <Header title="Holnapp" />
            <View flex center>
                <WeatherList />
            </View>
            <Global.ListViewContextProvider>
                <AddView />
                <AddButton />
            </Global.ListViewContextProvider>
        </Animated.View>
    )
}
