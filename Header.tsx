import { TextStyle } from 'react-native'
import { View, Text } from 'react-native-ui-lib'

import { Spacing } from './Global'

interface HeaderProps {
    title: string
    style: TextStyle
}

export function Header({ title, style }: HeaderProps) {
    return (
        <View centerV left style={{ padding: Spacing, height: 100 }}>
            <Text style={{ fontSize: 34, fontWeight: '600', ...style }}>{title}</Text>
        </View>
    )
}
