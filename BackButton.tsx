import { useContext } from 'react'
import { Button } from 'react-native-ui-lib'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import * as Global from './Global'

export function BackButton() {
    const { show, setShow } = useContext(Global.ShowAddView)
    const { setData } = useContext(Global.Locations)
    const { finalData } = useContext(Global.FinalData)

    const opacity = useAnimatedStyle(() => {
        return {
            opacity: withTiming(show ? 1 : 0, { duration: Global.AnimationLength }),
        };
    });

    const onPress = () => {
        setShow(() => false)
        setData(() => [...finalData])
    }

    return (
        <Animated.View style={opacity}>
            <Button
                iconSource={require('./assets/angle-double-right.png')}
                style={{
                    position: 'absolute', top: Global.ScreenDimensions.height - Global.Spacing - Global.ButtonSize, right: Global.Spacing,
                    width: Global.ButtonSize, height: Global.ButtonSize
                }}
                color='#000'
                backgroundColor="#fff"
                iconStyle={{ width: 32, height: 32 }}
                onPress={onPress}
            />
        </Animated.View>
    )
}
