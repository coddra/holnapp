import { useContext } from 'react'
import { Button } from 'react-native-ui-lib'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { ButtonSize, Spacing, ShowAddView, AnimationLength, ScreenDimensions } from './Global'

export function BackButton() {
    const { show, setShow } = useContext(ShowAddView)

    const opacity = useAnimatedStyle(() => {
        return {
            opacity: withTiming(show ? 1 : 0, { duration: AnimationLength }),
        };
    });

    return (
        <Animated.View style={opacity}>
            <Button
                iconSource={require('./assets/angle-double-right.png')}
                style={{ position: 'absolute', top: ScreenDimensions.height - Spacing - ButtonSize, right: Spacing, width: ButtonSize, height: ButtonSize }}
                color='#000'
                backgroundColor="#fff"
                iconStyle={{ width: 32, height: 32 }}
                onPress={() => setShow(() => false)}
            />
        </Animated.View>
    )
}
