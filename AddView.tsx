import { useContext } from 'react'
import { View, Text } from 'react-native-ui-lib'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import * as Global from './Global'
import { BackButton } from './BackButton'
import { Header } from './Header'
import { SearchField } from './SearchField'
import { SelectorList } from './SelectorList'

export function AddView() {
    const { data } = useContext(Global.Locations)
    const { showAddView, searchResult } = Global.useListViewContext()

    const transform = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            width: withTiming(showAddView ? Global.ScreenDimensions.width : Global.ButtonSize, { duration: Global.AnimationLength }),
            height: withTiming(showAddView ? Global.ScreenDimensions.height : Global.ButtonSize, { duration: Global.AnimationLength }),
            borderRadius: withTiming(showAddView ? 0 : Global.ButtonSize / 2, { duration: Global.AnimationLength }),
            bottom: withTiming(showAddView ? 0 : Global.Spacing, { duration: Global.AnimationLength }),
            right: withTiming(showAddView ? 0 : Global.Spacing, { duration: Global.AnimationLength }),
            opacity: withTiming(showAddView ? 1 : 0, { duration: Global.AnimationLength }),
            backgroundColor: '#000'
        };
    });

    return (
        <Animated.View style={transform}>
            <BackButton />
            <Header style={{ color: '#fff' }} title="Locations" />
            <View style={{ marginLeft: Global.Spacing, marginRight: Global.Spacing }}>
                <>
                    <SearchField />
                    <SelectorList data={searchResult} />
                    {showAddView &&
                        <>
                            <View style={{ height: 60 }} />
                            <Text style={{ color: '#fff' }}>Previous</Text>
                            <SelectorList data={data} />
                        </>
                    }
                </>
            </View>
        </Animated.View>
    )
}
