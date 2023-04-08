import { useContext, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { TextField, View } from 'react-native-ui-lib'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import axios from 'axios'

import * as Global from './Global'
import { BackButton } from './BackButton'
import { Header } from './Header'
import { SearchItem } from './SearchItem'

export function AddView() {
    const { text, setText } = useContext(Global.SearchText)
    const { show } = useContext(Global.ShowAddView)
    const { searchData, setSearchData } = useContext(Global.SearchData)

    const onChangeText = (t: string) => {
        setText(text => t)
        if (t.length < 3) {
            return
        }
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${t}&limit=5&appid=${Global.AppID}`).then(response => {
            setSearchData(response.data.map(d => {
                return { id: d.name + d.lat + ':' + d.lon, name: d.name, country: d.country, coords: { lat: d.lat, lon: d.lon } }
            }))
        }).catch(() => {
            setSearchData(() => [])
        })
    }

    const transform = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            width: withTiming(show ? Global.ScreenDimensions.width : Global.ButtonSize, { duration: Global.AnimationLength }),
            height: withTiming(show ? Global.ScreenDimensions.height : Global.ButtonSize, { duration: Global.AnimationLength }),
            borderRadius: withTiming(show ? 0 : Global.ButtonSize / 2, { duration: Global.AnimationLength }),
            bottom: withTiming(show ? 0 : Global.Spacing, { duration: Global.AnimationLength }),
            right: withTiming(show ? 0 : Global.Spacing, { duration: Global.AnimationLength }),
            opacity: withTiming(show ? 1 : 0, { duration: Global.AnimationLength }),
            backgroundColor: '#000'
        };
    });

    return (
        <Animated.View style={transform}>
            <BackButton />
            <Header style={{ color: '#fff' }} title="Add locations" />
            <View style={{ marginLeft: Global.Spacing, marginRight: Global.Spacing }}>
                <TextField
                    value={text}
                    style={{ color: '#fff' }}
                    returnKeyType='done'
                    placeholder={'Search'} floatingPlaceholder
                    onChangeText={onChangeText}
                    fieldStyle={{ borderBottomWidth: 2, borderBottomColor: '#fff' }}
                />
                <FlatList
                    data={searchData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <SearchItem {...item} />}
                />
            </View>
        </Animated.View>
    )
}
