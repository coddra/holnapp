import { useState, useContext } from 'react'
import { View } from 'react-native-ui-lib'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

import * as Global from './Global'
import { WeatherList } from './WeatherList'
import { AddButton } from './AddButton'
import { AddView } from './AddView'
import { Header } from './Header'

export function ListView() {
    const [show, setShow] = useState(false)
    const [text, setText] = useState('')
    const [searchResult, setSearchResult] = useState([] as Global.WeatherListItem[])
    const [finalData, setFinalData] = useState([] as Global.WeatherListItem[])
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
            <Global.ShowAddView.Provider value={{ show: show, setShow: setShow }}>
                <Global.SearchText.Provider value={{ text: text, setText: setText }}>
                    <Global.SearchResult.Provider value={{ searchResult: searchResult, setSearchResult: setSearchResult }}>
                        <Global.FinalData.Provider value={{ finalData: finalData, setFinalData: setFinalData }}>
                            <AddView />
                            <AddButton />
                        </Global.FinalData.Provider>
                    </Global.SearchResult.Provider>
                </Global.SearchText.Provider>
            </Global.ShowAddView.Provider>
        </Animated.View>
    )
}
